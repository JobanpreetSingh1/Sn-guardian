<?php
// head_code.php
// Centralized head include. Set $page_title, $page_description, $page_keywords before including.
if (!isset($page_title) || empty($page_title)) {
    $page_title = 'S&N GuardianGrid - AI-Powered CCTV Monitoring & Security Solution';
}
if (!isset($page_description) || empty($page_description)) {
    $page_description = 'AI-powered CCTV monitoring and security solution for modern businesses.';
}
if (!isset($page_keywords) || empty($page_keywords)) {
    $page_keywords = 'CCTV, security, AI monitoring, surveillance, GuardianGrid';
}
?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($page_title, ENT_QUOTES, 'UTF-8'); ?></title>
    <meta name="description" content="<?php echo htmlspecialchars($page_description, ENT_QUOTES, 'UTF-8'); ?>">
    <meta name="keywords" content="<?php echo htmlspecialchars($page_keywords, ENT_QUOTES, 'UTF-8'); ?>">
    <link rel="icon" href="assets/images/logo/logo.png">
    <link rel="stylesheet" href="assets/css/app.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Open Graph / Twitter -->
    <meta property="og:title" content="<?php echo htmlspecialchars($page_title, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:description" content="<?php echo htmlspecialchars($page_description, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:type" content="website">
    <meta property="og:image" content="assets/images/logo/logo.png">
    <meta name="twitter:card" content="summary_large_image">
    <!-- favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="assets/images/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/images/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/favicon/favicon-16x16.png">
    <link rel="manifest" href="assets/images/favicon/site.webmanifest">
</head>

<body>