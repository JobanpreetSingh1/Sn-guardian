# GuardianGrid - AI-Powered CCTV Monitoring Website

A premium, production-ready SaaS website for S&N GuardianGrid Technologies featuring a cutting-edge 3D hero animation, responsive design, and complete contact form integration.

## 🎯 Features

### Design & UX
- **Dark Theme with Neon Accents** - Premium navy/black background with cyan & blue highlights
- **3D Hero Animation** - Interactive Three.js animation with floating particles and rotating mesh
- **Glassmorphism Design** - Modern frosted glass effect cards with backdrop blur
- **Smooth Animations** - Scroll-triggered animations with Intersection Observer
- **Fully Responsive** - Mobile-first design that works on all devices
- **Sticky Navigation** - Persistent navbar with smooth scroll behavior

### Sections
1. **Hero Section** - 3D animated background with CTA buttons
2. **Problem Section** - Crime statistics and market challenges
3. **Solution Section** - AI-powered features and benefits
4. **Comparison Table** - GuardianGrid vs Traditional Systems
5. **How It Works** - 4-step animated timeline
6. **Services Section** - AI Monitoring, Alerts & Dispatch, Reports
7. **Pricing Section** - 4 tiered pricing plans with highlighted premium option
8. **Contact Section** - PHP form with validation and email integration
9. **Footer** - Social links and quick navigation

### Technical Features
- ✅ **Three.js 3D Animation** - Interactive 3D hero with mouse tracking
- ✅ **Scroll Animations** - Lazy-loaded animations on scroll
- ✅ **Form Validation** - Real-time client-side validation + server-side PHP validation
- ✅ **Email Integration** - HTML-formatted emails with automatic logging
- ✅ **Mobile Menu** - Hamburger menu with smooth animations
- ✅ **Cursor Glow Effect** - Custom cursor enhancement (desktop only)
- ✅ **Counter Animations** - Animated number counters for statistics
- ✅ **Accessibility** - Keyboard navigation and focus states
- ✅ **Performance Optimized** - Lazy loading, GPU acceleration

## 📁 File Structure

```
cctv/
├── index.html          # Main HTML file
├── style.css           # Complete CSS styling (production-ready)
├── script.js           # JavaScript functionality (no jQuery)
├── contact.php         # PHP contact form handler
├── .htaccess          # Apache configuration for SEO & security
├── logs/              # Contact form submission logs (auto-created)
└── README.md          # This file
```

## 🚀 Installation & Setup

### Requirements
- **PHP 7.4+** (for form handling)
- **Web Server** - Apache with mod_rewrite enabled, or Nginx
- **Modern Browser** - Chrome, Firefox, Safari, Edge (ES6 JavaScript support)

### Step 1: Extract Files
Place all files in your web root directory (e.g., `/var/www/html/cctv/` or `C:\xampp\htdocs\cctv\`)

### Step 2: Configure Email (contact.php)
Edit `contact.php` and update the email recipient:

```php
$to = 'your-email@guardiangrid.com'; // Change this to your email
```

### Step 3: Set Permissions (Linux/Mac)
```bash
chmod 755 contact.php
chmod 755 logs/  # Create logs directory with proper permissions
```

### Step 4: Access the Website
```
http://localhost/cctv/
http://yourdomain.com/cctv/
```

## 🎨 Customization

### Colors
Edit CSS variables in `style.css`:

```css
:root {
    --primary-dark: #0B0F1A;
    --neon-cyan: #00E5FF;
    --neon-blue: #3B82F6;
    --accent-pink: #EC4899;
}
```

### Content
Edit text content directly in `index.html`:
- Hero title & subtitle
- Feature descriptions
- Pricing plans
- Contact information

### 3D Animation
Modify 3D settings in `script.js` in the `initHeroCanvas()` function:
- `particleCount` - Number of particles
- `size` - Particle size
- `camera.position.z` - Camera distance

## 📧 Contact Form

### Features
- ✅ Real-time validation (name, email, phone, message)
- ✅ Server-side validation
- ✅ HTML-formatted email notifications
- ✅ JSON logging to `logs/contact_submissions.json`
- ✅ Error handling with user-friendly messages

### Validation Rules
- **Name**: Min 2 characters
- **Email**: Valid email format
- **Phone**: 10 digits (Indian format)
- **Message**: Min 10 characters

### Email Headers
Ensure your server allows mail sending:
```bash
# On Linux, check Postfix/Sendmail
sudo systemctl status postfix
```

## 🔒 Security Features

- ✅ CSRF-safe form handling
- ✅ Input sanitization (XSS prevention)
- ✅ Email validation
- ✅ Phone number validation
- ✅ Rate limiting (via .htaccess or your host)
- ✅ CORS headers configured
- ✅ No sensitive data exposed

### .htaccess Configuration
The included `.htaccess` file provides:
- URL rewriting for clean URLs
- Security headers
- GZIP compression
- Cache control

## 📱 Responsive Breakpoints

```css
Mobile: < 480px
Tablet: 480px - 768px
Desktop: > 768px
```

## ⚡ Performance Optimizations

- **Lazy Loading** - Animations trigger on scroll
- **GPU Acceleration** - 3D rendering uses hardware acceleration
- **Debounced Events** - Scroll and resize events optimized
- **Minified Assets** - Recommended for production
- **Async Scripts** - Non-blocking JavaScript loading

## 🎯 SEO Optimization

- Semantic HTML5 structure
- Meta tags for social sharing
- Proper heading hierarchy
- Mobile-friendly viewport
- Fast page load (recommend adding Cloudflare)

## 🧪 Testing

### Desktop Testing
- Chrome, Firefox, Safari, Edge
- Test form submission
- Test 3D animation performance

### Mobile Testing
- iOS Safari
- Chrome Android
- Test touch interactions
- Test mobile menu

### Form Testing
- Valid submissions
- Invalid email format
- Phone number validation
- Empty fields

## 📊 Analytics Integration

To add Google Analytics, add this before closing `</body>` in `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚨 Troubleshooting

### 3D Animation Not Showing
- Check browser console for errors
- Ensure Three.js CDN is accessible
- Check WebGL support: `chrome://gpu/`

### Contact Form Not Sending
- Check PHP error logs
- Verify email configuration
- Check `contact.php` email address
- Ensure server allows mail() function

### CSS Not Loading
- Clear browser cache (Ctrl+Shift+Delete)
- Check file paths are correct
- Verify .htaccess is properly configured

### Mobile Menu Not Working
- Check JavaScript console for errors
- Ensure `script.js` is loaded
- Test in different browsers

## 📚 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern features (Grid, Flexbox, Animations, Backdrop Filter)
- **Vanilla JavaScript** - No dependencies (ES6+)
- **Three.js** - 3D graphics library
- **PHP 7.4+** - Backend form handling
- **Font Awesome** - Icon library

## 📄 License

This website template is provided as-is for S&N GuardianGrid Technologies.

## 💬 Support

For issues or customizations:
1. Check browser console (F12)
2. Review PHP error logs
3. Test in different browsers
4. Clear cache and reload

## 🎉 Production Deployment Checklist

- [ ] Update email address in `contact.php`
- [ ] Update company details (phone, address, email)
- [ ] Test all forms and links
- [ ] Set proper file permissions (755)
- [ ] Enable HTTPS/SSL
- [ ] Configure CDN (optional)
- [ ] Add Google Analytics
- [ ] Test on mobile devices
- [ ] Check SEO meta tags
- [ ] Set up email notifications

---

**Version**: 1.0.0  
**Last Updated**: April 2024  
**Author**: GuardianGrid Technologies
