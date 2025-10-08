(function(){
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('projectBriefForm');
    if (!form) return;

    const statusEl = document.getElementById('briefStatus');
    const summarySection = document.getElementById('briefSummary');
    const summaryOutput = document.getElementById('summaryOutput');
    const copyButton = document.getElementById('copySummary');
    const photoInput = document.getElementById('spacePhotos');
    const photoList = document.getElementById('photoList');
    const submitBtn = form.querySelector('button[type="submit"]');

    const updatePhotoList = () => {
      if (!photoList) return;
      photoList.innerHTML = '';
      const files = photoInput && photoInput.files ? Array.from(photoInput.files) : [];
      if (!files.length) {
        photoList.innerHTML = '<li>No photos selected yet.</li>';
        return;
      }

      files.forEach((file, index) => {
        if (index >= 12) return;
        const item = document.createElement('li');
        const sizeInKB = Math.max(1, Math.round(file.size / 1024));
        item.textContent = `${file.name} (${sizeInKB.toLocaleString()} KB)`;
        photoList.appendChild(item);
      });

      if (files.length > 12) {
        const extra = document.createElement('li');
        extra.textContent = `+ ${files.length - 12} more file(s)… (attach all of them when you email us)`;
        photoList.appendChild(extra);
      }
    };

    if (photoInput) {
      photoInput.addEventListener('change', updatePhotoList);
    }

    const buildSection = (label, value) => {
      if (!value) return '';
      return `${label}: ${value}`;
    };

    const buildSummary = (formData, selectedPhotos) => {
      const lines = [];

      lines.push(buildSection('Client name', formData.get('clientName')));
      lines.push(buildSection('Email', formData.get('clientEmail')));
      lines.push(buildSection('Phone', formData.get('clientPhone')));
      lines.push(buildSection('Project location', formData.get('projectLocation')));
      lines.push(buildSection('Service', formData.get('serviceType')));
      lines.push(buildSection('Target date', formData.get('targetDate')));
      lines.push('--- Project scope ---');
      lines.push(buildSection('Rooms / areas', formData.get('rooms')));
      lines.push(buildSection('Vision', formData.get('vision')));
      lines.push(buildSection('Daily-life musts', formData.get('function')));
      lines.push(buildSection('Pieces to keep / avoid', formData.get('keepList')));
      lines.push('--- Style notes ---');
      lines.push(buildSection('Color palette', formData.get('colorPalette')));
      lines.push(buildSection('Materials & finishes', formData.get('materials')));
      lines.push(buildSection('Preferred brands / retailers', formData.get('brands')));
      lines.push(buildSection('Hard no’s', formData.get('avoid')));
      lines.push('--- Logistics ---');
      lines.push(buildSection('Investment range', formData.get('budget')));
      lines.push(buildSection('Decision makers', formData.get('decisionMakers')));
      lines.push(buildSection('Meeting style', formData.get('meetingStyle')));
      lines.push(buildSection('Vendors already engaged', formData.get('vendors')));
      lines.push('--- Photos & inspiration ---');
      const inspiration = buildSection('Links to inspo', formData.get('inspirationLinks'));
      if (inspiration) lines.push(inspiration);
      const fileShare = buildSection('File share link', formData.get('fileShare'));
      if (fileShare) lines.push(fileShare);
      if (selectedPhotos.length) {
        lines.push(`Attached photo files: ${selectedPhotos.join(', ')}`);
      }
      lines.push('--- Extra notes ---');
      lines.push(buildSection('Additional context', formData.get('extras')));

      return lines.filter(Boolean).join('\n\n');
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const files = photoInput && photoInput.files ? Array.from(photoInput.files) : [];
      const photoNames = files.map((file) => file.name);
      const summary = buildSummary(formData, photoNames);

      const payload = {};
      formData.forEach((value, key) => {
        if (value instanceof File) return;
        payload[key] = typeof value === 'string' ? value.trim() : value;
      });

      payload.photoNames = photoNames;
      payload.summary = summary;

      if (statusEl) {
        statusEl.textContent = 'Sending your brief to our studio…';
      }

      const captchaAnswerInput = form.querySelector('[data-captcha-answer]');
      const captchaTokenInput = form.querySelector('[data-captcha-token]');
      if (captchaAnswerInput && captchaTokenInput) {
        payload.captchaAnswer = (captchaAnswerInput.value || '').trim();
        payload.captchaToken = captchaTokenInput.value || '';

        if (!payload.captchaAnswer || !payload.captchaToken) {
          if (statusEl) {
            statusEl.textContent = 'Solve the quick math check before submitting.';
          }
          return;
        }
      }

      if (submitBtn) submitBtn.disabled = true;

      try {
        const response = await fetch('/api/sendBrief', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await response.json().catch(() => ({}));

        if (response.ok) {
          if (statusEl) {
            statusEl.textContent = result.message || 'Thanks! Your project brief is in our Telegram queue.';
          }
          summaryOutput.value = summary || 'No responses captured.';
          if (summarySection) {
            summarySection.hidden = false;
            summarySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          form.reset();
          updatePhotoList();
        } else {
          const errorMessage = result.message || 'We could not deliver your brief. Please try again shortly.';
          if (statusEl) statusEl.textContent = errorMessage;
        }
      } catch (error) {
        console.error('Brief submission error:', error);
        if (statusEl) {
          statusEl.textContent = 'We hit a network issue sending to Telegram. Copy your responses and email them instead.';
        }
        summaryOutput.value = summary || '';
        if (summarySection) summarySection.hidden = false;
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        form.dispatchEvent(new CustomEvent('captcha:reset'));
      }
    });

    if (copyButton) {
      copyButton.addEventListener('click', async () => {
        if (!summaryOutput.value) {
          if (statusEl) statusEl.textContent = 'Complete the form first so we have something to copy.';
          return;
        }
        try {
          await navigator.clipboard.writeText(summaryOutput.value);
          copyButton.textContent = 'Copied!';
          copyButton.classList.add('is-success');
          setTimeout(() => {
            copyButton.textContent = 'Copy summary to clipboard';
            copyButton.classList.remove('is-success');
          }, 2500);
        } catch (error) {
          console.error('Clipboard copy failed', error);
          if (statusEl) {
            statusEl.textContent = 'Select the summary text manually if your browser blocks clipboard access.';
          }
        }
      });
    }
  });
})();
