(() => {
  const forms = Array.from(document.querySelectorAll('[data-captcha-form]'));
  if (!forms.length) return;

  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  forms.forEach((form, index) => {
    const questionEl = form.querySelector('[data-captcha-question]');
    const answerInput = form.querySelector('[data-captcha-answer]');
    const tokenInput = form.querySelector('[data-captcha-token]');
    const refreshButton = form.querySelector('[data-captcha-refresh]');

    if (!questionEl || !answerInput || !tokenInput) {
      return;
    }

    const ensureIds = () => {
      if (!questionEl.id) {
        questionEl.id = `captchaPrompt-${index + 1}`;
      }
      if (!answerInput.id) {
        answerInput.id = `captchaAnswer-${index + 1}`;
      }
      answerInput.setAttribute('aria-describedby', questionEl.id);
    };

    const setQuestion = () => {
      const first = randomInt(10, 49);
      const second = randomInt(1, 10);
      questionEl.textContent = `What is ${first} + ${second}?`;
      tokenInput.value = window.btoa(`${first}:${second}:${Date.now()}`);
      answerInput.value = '';
    };

    ensureIds();
    setQuestion();

    if (refreshButton) {
      refreshButton.addEventListener('click', (event) => {
        event.preventDefault();
        setQuestion();
        answerInput.focus();
      });
    }

    form.addEventListener('captcha:reset', () => {
      setQuestion();
    });
  });
})();
