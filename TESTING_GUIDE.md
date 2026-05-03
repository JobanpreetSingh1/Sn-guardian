# Quick Testing Guide - S&N GuardianGrid Website

## 🚀 Start the Server

### Option 1: XAMPP (Windows)
```bash
# Start Apache from XAMPP Control Panel
# Then open browser:
http://localhost/cctv/
```

### Option 2: PHP Built-in Server
```bash
cd c:\xampp\htdocs\cctv
php -S localhost:8000
# Open: http://localhost:8000
```

---

## ✅ Testing Checklist

### 1. Navigation & Page Links
- [ ] **Homepage**: http://localhost/cctv/ loads correctly
- [ ] **Navbar sticky**: Scroll down, navbar stays at top with "scrolled" styling
- [ ] **Mobile menu**: On mobile/small screen, hamburger icon appears, click opens menu
- [ ] **Navigation links**: Click each navbar link (Home, About, Services, Blog, Contact)
- [ ] **Footer links**: Test all footer navigation links work
- [ ] **CTA buttons**: All "Get Started" and "Book Demo" buttons go to contact page

### 2. Homepage Testing (index.html)

#### Hero Section
- [ ] **3D Animation**: Canvas renders with rotating geometry (may take 2-3 sec)
- [ ] **Mouse interaction**: Move mouse over hero canvas, geometry follows cursor
- [ ] **Stats animation**: Scroll to stats section, numbers animate upward
- [ ] **Scroll indicator**: Arrow down animation visible on initial load

#### Sections
- [ ] **Problem cards**: Load with animation on scroll
- [ ] **Solution cards**: Staggered animation on scroll
- [ ] **Comparison table**: Renders with all 6 rows and 3 columns
- [ ] **Pricing cards**: 4 pricing tiers visible, Premium is highlighted
- [ ] **How it works**: 4-step timeline with connectors
- [ ] **Services**: 3 service cards visible
- [ ] **Contact form**: Visible with all fields

### 3. About Page Testing (about.html)

- [ ] **Page loads**: http://localhost/cctv/about.html
- [ ] **Hero section**: Title and subtitle render correctly
- [ ] **Company stats**: 
  - Counters animate to 10000, 5000, 99, 45
  - Text displays correctly
- [ ] **Timeline**: 4 timeline events display with years and descriptions
- [ ] **Team cards**: 4 team members display with icons and social links
- [ ] **Values section**: 6 value cards with icons and descriptions
- [ ] **Achievements**: 4 award cards with trophy/medal/star icons

### 4. Services Page Testing (services.html)

- [ ] **Page loads**: http://localhost/cctv/services.html
- [ ] **Detailed services**: 4 main service cards visible with features & benefits
- [ ] **Add-on services**: 6 addon cards visible
- [ ] **Comparison table**: 
  - 5 columns (Feature, Alerts Only, Regular, Premium, Supreme)
  - 9 rows of features
  - Premium column highlighted
- [ ] **Implementation steps**: 6-step process visible with numbering
- [ ] **Pricing info**: Service pricing displayed correctly

### 5. Blog Page Testing (blog.html)

- [ ] **Page loads**: http://localhost/cctv/blog.html
- [ ] **Featured article**: Large featured article section visible
- [ ] **Category buttons**: 5 category buttons (All, AI & Tech, Security, Case Studies, Tips)
- [ ] **Blog articles**: 6 articles visible in grid
- [ ] **Category filtering** ⭐ **MOST IMPORTANT**:
  - Click "All Articles" → all 6 articles visible
  - Click "AI & Tech" → shows only AI-related articles (should hide others)
  - Click "Security" → shows only security articles
  - Click "Case Studies" → shows only case study articles
  - Watch articles smooth transition with opacity/transform
  - Categories use `data-category` attributes
- [ ] **Newsletter section**: Email input and subscribe button
- [ ] **Related resources**: 3 resource cards (Tutorial, Whitepaper, Webinar)

### 6. Contact Page Testing (contact.html)

- [ ] **Page loads**: http://localhost/cctv/contact.html
- [ ] **Quick contact cards**: 6 cards with phone, email, hours, location, hotline, chat
- [ ] **Contact form**: 
  - All fields present (name, email, phone, company, subject, message, checkbox)
  - Subject dropdown has options
  - Privacy checkbox required
- [ ] **Sidebar cards**:
  - Schedule demo card
  - FAQ links
  - Response time guarantee (24h, 1h, Live)
- [ ] **Office locations**: 3 office cards (Bangalore HQ, Delhi, Mumbai)
- [ ] **Support options**: 6 support cards (Docs, Videos, Forum, Training, Support, Report)

### 7. Form Validation Testing

#### On Homepage or Contact Page:
- [ ] **Name field**:
  - Enter 1 character → shows "Name must be at least 2 characters"
  - Enter 2+ characters → no error
- [ ] **Email field**:
  - Enter "test" → shows "Please enter a valid email"
  - Enter "test@example.com" → no error
- [ ] **Phone field**:
  - Enter non-digits → only digits count
  - Enter 9 digits → shows "Phone must be 10 digits"
  - Enter 10 digits → no error
- [ ] **Message field**:
  - Enter 9 characters → shows "Message must be at least 10 characters"
  - Enter 10+ characters → no error
- [ ] **Form submission**:
  - Click "Send Message" with invalid data → shows errors
  - Fill all fields correctly → submit works
  - After submit → either success message or PHP response

### 8. Responsive Design Testing

#### Mobile View (320px width)
- [ ] **Navbar**: Hamburger menu visible
- [ ] **Hero section**: Canvas responsive, content centered
- [ ] **Cards**: Single column layout
- [ ] **Forms**: Full width inputs
- [ ] **Tables**: Scrollable (if needed)

#### Tablet View (768px width)
- [ ] **Navbar**: Logo visible, nav links show
- [ ] **Grid layouts**: 2 columns where appropriate
- [ ] **Forms**: Proper spacing

#### Desktop View (1920px+)
- [ ] **Navbar**: Full horizontal navigation
- [ ] **Grid layouts**: 3-4 columns
- [ ] **3D animation**: Smooth performance

### 9. Browser DevTools Testing

Open DevTools (F12) and check:
- [ ] **Console**: No JavaScript errors
- [ ] **Network**: Assets load (CSS, JS, images)
- [ ] **Lighthouse**: Run Lighthouse audit
- [ ] **Elements**: Inspect HTML structure is semantic

### 10. Animation Testing

- [ ] **Loader**: Fade out animation on page load
- [ ] **Scroll animations**: Elements fade in/up as you scroll
- [ ] **Button hover**: Buttons change color/glow on hover
- [ ] **Category buttons**: Active state changes color
- [ ] **Blog cards**: Smooth opacity transitions when filtering

### 11. Performance Testing

- [ ] **Page load**: Measure with DevTools Network tab
  - Target: < 3 seconds on 4G
- [ ] **3D animation**: Smooth at 60 FPS
  - Check: Open DevTools > Performance > Record > Scroll > Check FPS
- [ ] **Form submission**: Smooth loading state
- [ ] **Category filtering**: Instant with smooth animations

### 12. Cross-Browser Testing

Test in at least 3 browsers:
- [ ] **Chrome/Edge**: All features working
- [ ] **Firefox**: All features working
- [ ] **Safari** (if available): All features working

---

## 🐛 Common Issues & Fixes

### 3D Animation Not Showing
- **Check**: Is Three.js loaded? (Check console)
- **Fix**: Ensure internet connection for CDN
- **Fallback**: Page still works without 3D

### Blog Filtering Not Working
- **Check**: Are category buttons clicking?
- **Debug**: Open console, check for JavaScript errors
- **Verify**: HTML has `data-category` attributes on blog cards

### Form Not Submitting
- **Check**: contact.php exists in same folder as index.html
- **Verify**: Form validation passes (all fields valid)
- **Debug**: Check Network tab in DevTools for 404 or 500 errors

### Mobile Menu Not Opening
- **Check**: Is menuToggle button visible? (DevTools mobile view)
- **Debug**: Check console for JavaScript errors
- **Verify**: .active class is being toggled

### Navbar Not Sticky
- **Check**: Browser scroll position
- **Debug**: Check CSS `.navbar.scrolled` class
- **Verify**: CSS loading correctly

---

## 📊 Success Criteria

✅ **You've successfully tested when:**

1. ✅ All 5 pages (home, about, services, blog, contact) load
2. ✅ Navigation works between all pages
3. ✅ 3D hero animation renders and responds to mouse
4. ✅ Blog category filtering works smoothly
5. ✅ Form validation works (error messages appear)
6. ✅ Form submission triggers (at least JSON logging works)
7. ✅ Mobile menu works on small screens
8. ✅ Animations trigger on scroll
9. ✅ No JavaScript errors in console
10. ✅ Page loads in < 3 seconds

---

## 📝 Form Testing Details

### Test Form Submission Flow

1. **Navigate to contact page**: `/contact.html`
2. **Fill the form**:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Phone: "9876543210"
   - Company: "Tech Corp"
   - Subject: "Demo Request"
   - Message: "I'd like to schedule a demo"
   - Check privacy checkbox
3. **Click "Send Message"**
4. **Expected behavior**:
   - Button shows "Sending..." state
   - After 1-2 seconds, success message appears
   - Form resets
5. **Check logs** (if configured):
   - Log file: `/logs/contact_submissions.json`
   - Should contain form submission

---

## 🎯 Email Testing

### To Enable Email Sending:

1. Open `contact.php`
2. Configure email (line ~30):
```php
$to = 'your-email@example.com';
```
3. For XAMPP, use MailHog or local SMTP

### To Verify Logging:

1. Submit a form
2. Check: `c:\xampp\htdocs\cctv\logs\contact_submissions.json`
3. Should contain submission with:
   - timestamp
   - name
   - email
   - phone
   - message
   - ip_address

---

## 🎬 Animation Performance Testing

### Check 3D Animation Performance:

1. Open DevTools (F12)
2. Click Performance tab
3. Click Record
4. Refresh page and wait 5 seconds
5. Stop recording
6. Look for FPS meter (should stay near 60)

### Check Scroll Animation Performance:

1. Record performance while scrolling
2. FPS should remain smooth (60 FPS)
3. No long tasks (red) blocks

---

## ✨ Visual Verification Checklist

- [ ] Color scheme is consistent (dark background, cyan/blue accents)
- [ ] All text is readable on all backgrounds
- [ ] Images/icons load correctly
- [ ] Buttons have clear hover states
- [ ] Forms have clear focus states
- [ ] Spacing looks consistent
- [ ] No content overlaps
- [ ] Text is properly aligned

---

## 📱 Mobile Testing Specifics

### Use Chrome DevTools Mobile View:
1. Press F12
2. Click toggle device toolbar (top-left)
3. Select different device presets

### Test These on Mobile:
- [ ] Hamburger menu works
- [ ] Form fields are touch-friendly
- [ ] Text is readable without zoom
- [ ] No horizontal scrolling needed
- [ ] Buttons are easy to tap
- [ ] Images load correctly

---

## ✅ Final Verification

Once you've completed all tests above, your website is ready! 

**Expected Result**: A fully functional, responsive, AI-powered CCTV security website with all features working smoothly across devices and browsers.

**Next Step**: Follow `DEPLOYMENT.md` to deploy to production!

---

**Questions?** Refer to `README.md` for complete documentation.
