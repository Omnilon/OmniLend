document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = 'Sending message...';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    try {
        const response = await fetch('/api/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        const result = await response.json();

        if (response.ok) {
            formStatus.textContent = 'Your message has been sent successfully!';
            document.getElementById('contactForm').reset();
        } else {
            formStatus.textContent = `Error: ${result.message}`;
        }
    } catch (error) {
        console.error('Error:', error);
        formStatus.textContent = 'An error occurred while sending your message.';
    }
});