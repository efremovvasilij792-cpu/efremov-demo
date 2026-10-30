<?php
/*
 * Приём заказов и заявок с сайта Мастерской В.Ю. Ефремова.
 * Сайт отправляет сюда JSON, файл пересылает его на почту и (если настроено) в Telegram.
 *
 * Почта работает сразу. Для Telegram создайте рядом файл config.php по образцу config.example.php.
 * Токен бота храните ТОЛЬКО в config.php на хостинге — никуда его не выкладывайте.
 */

ini_set('display_errors', '0'); // ошибки не показываем посетителям — в них пути сервера

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

$config = [
    'email'            => 'pergola2023@mail.ru',   // куда приходят заказы
    'telegram_token'   => '',                      // токен бота от @BotFather
    'telegram_chat_id' => '',                      // ID мастера (узнать у @userinfobot)
    'site_domain'      => '',                      // домен сайта, например pergola.ru (необязательно)
];
if (is_file(__DIR__ . '/config.php')) {
    $config = array_merge($config, (array) require __DIR__ . '/config.php');
}

function reply($ok, $code = 200, $error = '') {
    http_response_code($code);
    echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error], JSON_UNESCAPED_UNICODE);
    exit;
}

// Только POST-запросы с сайта
if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(false, 405, 'method');

// Только JSON: обычная HTML-форма с чужого сайта так отправить не может
if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) reply(false, 415, 'type');

// Домен без www и порта, только безопасные символы
function bareHost($h) {
    $h = strtolower(preg_replace('/:\d+$/', '', (string) $h));
    return preg_replace('/^www\./', '', preg_replace('/[^a-z0-9.\-]/', '', $h));
}

// Заявка должна прийти со страниц этого же сайта: браузер не даст чужому сайту
// подделать Origin, поэтому сравниваем его с доменом, на который пришёл запрос
$from = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
$fromHost = bareHost(parse_url($from, PHP_URL_HOST));
$allowed = array_filter([bareHost($_SERVER['HTTP_HOST'] ?? ''), bareHost($config['site_domain'])]);
if ($fromHost === '' || !in_array($fromHost, $allowed, true)) reply(false, 403, 'origin');

// Домен для подписи письма: из настроек, иначе из конфигурации сервера
$bare = bareHost($config['site_domain'] ?: ($_SERVER['SERVER_NAME'] ?? '')) ?: 'site';
$host = $bare;

$raw = file_get_contents('php://input', false, null, 0, 20000);
$data = json_decode($raw, true);
if (!is_array($data)) reply(false, 400, 'bad json');

// Ловушка для ботов: это поле на сайте всегда пустое
if (!empty($data['website'])) reply(true);

// Лимиты: не больше 5 отправок за 10 минут с одного адреса и 40 в час со всех вместе
function overLimit($key, $max, $window) {
    $file = sys_get_temp_dir() . '/efremov_rate_' . $key;
    $hits = array_filter((array) @json_decode(@file_get_contents($file), true), fn($t) => $t > time() - $window);
    if (count($hits) >= $max) return true;
    $hits[] = time();
    @file_put_contents($file, json_encode(array_values($hits)), LOCK_EX);
    return false;
}
if (overLimit(md5($_SERVER['REMOTE_ADDR'] ?? 'x'), 5, 600)) reply(false, 429, 'too many');
if (overLimit('all', 40, 3600)) reply(false, 429, 'too many');

// Очистка текста: без тегов и управляющих символов, с ограничением длины
function clean($s, $max) {
    $s = strip_tags((string) $s);
    $s = preg_replace('/[^\P{C}\n\t]/u', '', $s);
    return mb_substr(trim($s), 0, $max);
}
$subject = clean($data['subject'] ?? 'Заявка с сайта', 200);
$text    = clean($data['text'] ?? '', 6000);
$phone   = clean($data['phone'] ?? '', 40);
$email   = filter_var(clean($data['email'] ?? '', 120), FILTER_VALIDATE_EMAIL) ?: '';

if ($text === '' || $phone === '') reply(false, 422, 'empty');

$body = $text . "\n\n—\nОтправлено с сайта " . $host . ' · ' . date('d.m.Y H:i');

$sent = false;

// 1) Почта
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: =?UTF-8?B?' . base64_encode('Сайт Мастерской Ефремова') . '?= <noreply@' . $bare . '>',
];
if ($email) $headers[] = 'Reply-To: ' . $email;
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
if (@mail($config['email'], $encodedSubject, $body, implode("\r\n", $headers))) $sent = true;

// 2) Telegram (если в config.php указаны токен и ID)
if ($config['telegram_token'] !== '' && $config['telegram_chat_id'] !== '') {
    $url = 'https://api.telegram.org/bot' . $config['telegram_token'] . '/sendMessage';
    $payload = http_build_query([
        'chat_id' => $config['telegram_chat_id'],
        'text'    => mb_substr("🛒 " . $subject . "\n\n" . $body, 0, 4000),
        'disable_web_page_preview' => 'true',
    ]);
    $ctx = stream_context_create(['http' => [
        'method' => 'POST', 'timeout' => 8,
        'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
        'content' => $payload,
    ]]);
    $res = @file_get_contents($url, false, $ctx);
    if ($res && (json_decode($res, true)['ok'] ?? false)) $sent = true;
}

$sent ? reply(true) : reply(false, 502, 'not sent');
