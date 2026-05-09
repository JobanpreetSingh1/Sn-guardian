<!-- NAVBAR -->
<nav class="navbar" id="navbar" aria-label="Primary navigation">
    <div class="nav-wrapper">
        <a href="index.php" class="logo" aria-label="GuardianGrid home">
            <img src="assets/images/logo/logo.png" alt="GuardianGrid Logo" class="logo-image">
        </a>

        <button class="menu-toggle" id="menuToggle" type="button" aria-controls="navLinks" aria-expanded="false" aria-label="Toggle navigation menu" onclick="(function(){const mt=this;const nav=document.getElementById('navLinks');const active=mt.classList.toggle('active');if(nav)nav.classList.toggle('active');mt.setAttribute('aria-expanded', active);}).call(this)">
            <span></span>
            <span></span>
            <span></span>
        </button>

        <ul class="nav-links" id="navLinks">
            <li><a href="index.php" class="nav-link">Home</a></li>
            <li><a href="about.php" class="nav-link">About</a></li>
            <li><a href="services.php" class="nav-link">Services</a></li>
            <li><a href="blog.php" class="nav-link">Blog</a></li>
            <li><a href="contact-page.php" class="nav-link">Contact</a></li>
        </ul>

        <a href="contact-page.php" class="cta-btn-nav">Get Started</a>
    </div>
        </nav>
        <style>
        /* Ensure hamburger visible and clickable across CSS ordering */
        @media (max-width: 768px) { .menu-toggle { display: flex !important; } }
        .menu-toggle { z-index: 1002 !important; }
        </style>
        <script>
        // Persistent fallback: delegated listener in case other scripts fail to bind
        (function(){
            document.addEventListener('click', function(e){
                const mt = document.getElementById('menuToggle');
                if(!mt) return;
                if(mt.contains(e.target) || e.target === mt) {
                    const nav = document.getElementById('navLinks');
                    const active = mt.classList.toggle('active');
                    if(nav) nav.classList.toggle('active');
                    mt.setAttribute('aria-expanded', active);
                    console.log('Persistent fallback toggle. aria-expanded=', active);
                }
            }, { passive: true });
        })();
        </script>

<style>
@media (max-width: 768px) {
    .menu-toggle { display: flex !important; }
}
/* Force-visible fallback to ensure toggle is available during debugging */
.menu-toggle { display: flex !important; z-index: 1002 !important; }
</style>
<script>
// Fallback mobile menu toggle: ensures click works and logs state for debugging
(function(){
    try {
        const mt = document.getElementById('menuToggle');
        const nav = document.getElementById('navLinks');
        if (!mt || !nav) return;
        mt.addEventListener('click', (e) => {
            const active = mt.classList.toggle('active');
            nav.classList.toggle('active');
            mt.setAttribute('aria-expanded', active);
            console.log('Fallback menu toggle clicked. aria-expanded=', active);
        });
    } catch (err) {
        console.error('Fallback menu toggle error:', err);
    }
})();
</script>