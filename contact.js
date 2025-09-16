const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formStatus = document.getElementById('formStatus');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;
        if (formStatus) formStatus.textContent = 'Sending your project details…';

        const payload = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            service: document.getElementById('service') ? document.getElementById('service').value : '',
            budget: document.getElementById('budget') ? document.getElementById('budget').value : '',
            message: document.getElementById('message').value.trim()
        };

        try {
            const response = await fetch('/api/sendMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json().catch(() => ({}));

            if (response.ok) {
                if (formStatus) formStatus.textContent = 'Thanks! Your note is en route to our Telegram inbox.';
                contactForm.reset();
            } else {
                const msg = result.message || 'We could not deliver your message. Please try again shortly.';
                if (formStatus) formStatus.textContent = msg;
            }
        } catch (error) {
            console.error('Contact form error:', error);
            if (formStatus) formStatus.textContent = 'We hit a network issue sending to Telegram. Please try again.';
        } finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}
