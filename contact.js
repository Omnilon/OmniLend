const forms = Array.from(document.querySelectorAll('[data-contact-form]'));

if (forms.length) {
    forms.forEach((form) => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const statusEl = form.querySelector('[data-form-status]');
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;
            if (statusEl) statusEl.textContent = 'Sending your request…';

            const formData = new FormData(form);
            const payload = {};
            formData.forEach((value, key) => {
                if (typeof value === 'string') {
                    payload[key] = value.trim();
                } else {
                    payload[key] = value;
                }
            });
            payload.experience = form.getAttribute('data-experience') || 'general';

            try {
                const response = await fetch('/api/sendMessage', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json().catch(() => ({}));

                if (response.ok) {
                    if (statusEl) statusEl.textContent = 'Thanks! Your note is en route to our Telegram inbox.';
                    form.reset();
                } else {
                    const msg = result.message || 'We could not deliver your message. Please try again shortly.';
                    if (statusEl) statusEl.textContent = msg;
                }
            } catch (error) {
                console.error('Contact form error:', error);
                if (statusEl) statusEl.textContent = 'We hit a network issue sending to Telegram. Please try again.';
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    });
}
