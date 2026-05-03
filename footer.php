  <footer class="footer">
      <div class="container">
          <div class="footer-content">
              <div class="footer-section">
                  <div class="footer-logo">
                      <i class="fas fa-shield-alt"></i>
                      <span>GuardianGrid</span>
                  </div>
                  <p>AI-powered CCTV monitoring and security solution for modern businesses.</p>
              </div>

              <div class="footer-section">
                  <h4>Quick Links</h4>
                  <ul>
                      <li><a href="index.php">Home</a></li>
                      <li><a href="about.php">About</a></li>
                      <li><a href="services.php">Services</a></li>
                      <li><a href="contact-page.php">Contact</a></li>
                  </ul>
              </div>

              <div class="footer-section">
                  <h4>Resources</h4>


                  <ul>
                      <li><a href="#">Documentation</a></li>
                      <li><a href="blog.php">Blog</a></li>
                      <li><a href="#">FAQ</a></li>
                      <li><a href="#">Support</a></li>
                  </ul>
              </div>

              <div class="footer-section">
                  <h4>Follow Us</h4>
                  <div class="social-icons">
                      <a href="#" target="_blank"><i class="fab fa-facebook"></i></a>
                      <a href="#" target="_blank"><i class="fab fa-twitter"></i></a>
                      <a href="#" target="_blank"><i class="fab fa-linkedin"></i></a>
                      <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
                  </div>
              </div>
          </div>

          <div class="footer-bottom">
              <p>&copy; 2024 S&N GuardianGrid Technologies. All rights reserved.</p>
              <div class="footer-links">
                  <a href="#">Privacy Policy</a>
                  <a href="#">Terms of Service</a>
              </div>
          </div>
      </div>
  </footer>
  <script>
      // Debug & safety: ensure any lingering loader is removed and inputs are interactable
      document.addEventListener('DOMContentLoaded', function() {
          try {
              const loader = document.querySelector('.loader');
              if (loader) {
                  // remove overlay that may block inputs
                  loader.parentNode && loader.parentNode.removeChild(loader);
                  console.debug('Removed lingering loader overlay');
              }

              // Add temporary visual outline to contact inputs to help debug overlay issues
              document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select').forEach(el => {
                  el.style.outline = '2px dashed rgba(0,229,255,0.18)';
                  el.addEventListener('focus', () => el.style.outline = '2px solid var(--neon-cyan)');
                  el.addEventListener('blur', () => el.style.outline = '2px dashed rgba(0,229,255,0.08)');
              });
          } catch (e) {
              console.error('Footer debug script error', e);
          }
      });
  </script>