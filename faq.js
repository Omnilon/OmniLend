// faq.js

document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item h3');

    faqItems.forEach((item) => {
        item.addEventListener('click', () => {
            const parent = item.parentNode;
            parent.classList.toggle('active');
        });
    });
});
