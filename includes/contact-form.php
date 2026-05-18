<?php
// Reusable contact form include
?>
<div class="contact-form-wrapper">
    <div class="form-header">
        <h2>Send us a Message</h2>
        <p>Fill out the form below and our team will get back to you as soon as possible.</p>
    </div>

    <form id="contactForm" class="contact-form glass-card" novalidate data-contact-form="custom">
        <div class="form-group">
            <label for="name">Full Name *</label>
            <input type="text" id="name" name="name" placeholder="John Doe" required>
            <span class="form-error" data-for="name"></span>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="email">Email Address *</label>
                <input type="email" id="email" name="email" placeholder="john@example.com" required>
                <span class="form-error" data-for="email"></span>
            </div>

            <div class="form-group">
                <label for="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" placeholder="+91 XXXXX XXXXX" required>
                <span class="form-error" data-for="phone"></span>
            </div>
        </div>

        <div class="form-group">
            <label for="company">Company Name</label>
            <input type="text" id="company" name="company" placeholder="Your Company">
            <span class="form-error" data-for="company"></span>
        </div>

        <div class="form-group">
            <label for="subject">Subject *</label>
            <select id="subject" name="subject" required>
                <option value="">Select a subject</option>
                <option value="inquiry">General Inquiry</option>
                <option value="demo">Demo Request</option>
                <option value="support">Technical Support</option>
                <option value="sales">Sales Question</option>
                <option value="partnership">Partnership Opportunity</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
            </select>
            <span class="form-error" data-for="subject"></span>
        </div>

        <div class="form-group">
            <label for="message">Message *</label>
            <textarea id="message" name="message" rows="6" placeholder="Tell us about your inquiry..." required></textarea>
            <span class="form-error" data-for="message"></span>
        </div>

        <div class="form-group checkbox">
            <input type="checkbox" id="privacy" name="privacy" required>
            <label for="privacy">I agree to the privacy policy and terms of service</label>
            <span class="form-error" data-for="privacy"></span>
        </div>

        <input type="hidden" id="hiddenURL" name="hiddenURL">
        <button type="submit" id="submit" class="btn btn-primary btn-block">Send Message</button>
        <div id="formMessage" class="form-message"></div>
    </form>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function() {

        const form = document.getElementById("contactForm");
        const submitBtn = document.getElementById("submit");
        const formMessage = document.getElementById("formMessage");

        if (!form) return;

        form.addEventListener("submit", submitContactForm);
        form.addEventListener("input", clearFieldState);
        form.addEventListener("change", clearFieldState);

        function submitContactForm(event) {
            event.preventDefault();

            clearErrors();
            formMessage.innerHTML = "";

            // Hidden current page URL
            document.getElementById("hiddenURL").value = window.location.href;

            // Get values
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const company = document.getElementById("company").value.trim();
            const subject = document.getElementById("subject").value;
            const message = document.getElementById("message").value.trim();
            const privacy = document.getElementById("privacy").checked;

            let isValid = true;

            // Name validation
            if (name === "") {
                showError("name", "Full name is required");
                isValid = false;
            }

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showError("email", "Please enter a valid email");
                isValid = false;
            }

            // Phone validation
            const phoneDigits = phone.replace(/\D/g, "");
            if (phoneDigits.length < 10 || phoneDigits.length > 15) {
                showError("phone", "Please enter a valid phone number");
                isValid = false;
            }

            // Subject validation
            if (subject === "") {
                showError("subject", "Please select a subject");
                isValid = false;
            }

            // Message validation
            if (message === "") {
                showError("message", "Message is required");
                isValid = false;
            }

            // Privacy checkbox
            if (!privacy) {
                showError("privacy", "Please accept privacy policy");
                isValid = false;
            }

            if (!isValid) return;

            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = "Sending...";
            formMessage.innerHTML = "<span style='color:#00ff99;'>Sending message...</span>";

            // Run reCAPTCHA v3
            grecaptcha.ready(function() {
                grecaptcha.execute("6Lf4sG4sAAAAAGdFtjqCECGMYA7sUSWYP-zj5mSg", {
                    action: "submit"
                }).then(function(token) {

                    const formData = {
                        name: name,
                        email: email,
                        mobile: phone,
                        company: company,
                        subject: subject,
                        message: message,
                        hiddenURL: document.getElementById("hiddenURL").value,
                        recaptchaToken: token,
                        sheet: "CONTACT"
                    };

                    fetch("https://script.google.com/macros/s/AKfycbyA20jC3q7EwEG9kTW8KIT_66FPOVb4y1oumRWxExZrCNO9utXV1hVe-0RbcA2DKMdgJg/exec", {
                            method: "POST",
                            headers: {
                                "Content-Type": "text/plain"
                            },
                            body: JSON.stringify(formData)
                        })
                        .then(() => {
                            formMessage.innerHTML = "<span style='color:#00ff99;'>✅ Message sent successfully.</span>";

                            form.reset();
                            clearErrors();

                            setTimeout(function() {
                                window.location.href = "thank-you.php";
                            }, 1000);

                            submitBtn.disabled = false;
                            submitBtn.innerHTML = "Send Message";
                        })
                        .catch(function(error) {

                            formMessage.innerHTML =
                                "<span style='color:#ff4444;'>❌ Network error. Try again.</span>";

                            submitBtn.disabled = false;
                            submitBtn.innerHTML = "Send Message";
                        });

                });
            });
        }

        function showError(field, message) {
            const el = document.querySelector('[data-for="' + field + '"]');
            if (el) {
                el.innerHTML = message;
            }
        }

        function clearErrors() {
            const errors = document.querySelectorAll(".form-error");
            errors.forEach(function(item) {
                item.innerHTML = "";
            });
        }

        function clearFieldState(event) {
            const target = event.target;
            if (!target || !target.id) return;

            const error = document.querySelector('[data-for="' + target.id + '"]');
            if (error && error.innerHTML) {
                error.innerHTML = "";
            }

            if (formMessage && formMessage.innerHTML) {
                formMessage.innerHTML = "";
            }
        }

    });
</script>

<!-- Google reCAPTCHA v3 -->
<script src="https://www.google.com/recaptcha/api.js?render=6Lf4sG4sAAAAAGdFtjqCECGMYA7sUSWYP-zj5mSg"></script>