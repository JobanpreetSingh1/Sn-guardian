<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You — GuardianGrid</title>
    <link rel="stylesheet" href="assets/css/app.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <?php include 'header.php'; ?>

    <main class="thankyou-section" style="padding:100px 20px;">
        <div class="container" style="max-width:900px; text-align:center;">
            <div class="glass-card" style="padding:48px; border-radius:16px; display:inline-block; background:linear-gradient(180deg, rgba(11,15,26,0.6), rgba(26,31,58,0.6));">
                <div style="font-size:64px; color:var(--neon-cyan); margin-bottom:12px;"><i class="fas fa-check-circle"></i></div>
                <h1 style="font-size:2.1rem; margin:0 0 12px; color:var(--white);">Thank you — We received your message</h1>
                <p style="color:var(--gray-med); font-size:1.05rem; margin-bottom:22px;">Our team has received your inquiry and will get back to you within 24 hours. If you need immediate assistance, please call us.</p>

                <div style="display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-bottom:18px;">
                    <a href="index.php" class="btn btn-secondary">Return Home</a>
                    <a href="contact-page.php" class="btn btn-primary">Contact Support</a>
                    <a href="contact-page.php#main-contact" class="btn btn-outline">Book a Demo</a>
                </div>

                <p style="color:var(--gray-light); font-size:0.92rem; margin-top:8px;">While you wait — explore our <a href="services.php">services</a> or read our <a href="blog.php">latest insights</a>.</p>
            </div>
        </div>
    </main>

    <?php include 'footer.php'; ?>

    <script src="assets/js/app.js"></script>
</body>
</html>
