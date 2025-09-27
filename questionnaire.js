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

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const lines = [];

      lines.push(buildSection('Client name', data.get('clientName')));
      lines.push(buildSection('Email', data.get('clientEmail')));
      lines.push(buildSection('Phone', data.get('clientPhone')));
      lines.push(buildSection('Project location', data.get('projectLocation')));
      lines.push(buildSection('Service', data.get('serviceType')));
      lines.push(buildSection('Target date', data.get('targetDate')));
      lines.push('--- Project scope ---');
      lines.push(buildSection('Rooms / areas', data.get('rooms')));
      lines.push(buildSection('Vision', data.get('vision')));
      lines.push(buildSection('Daily-life musts', data.get('function')));
      lines.push(buildSection('Pieces to keep / avoid', data.get('keepList')));
      lines.push('--- Style notes ---');
      lines.push(buildSection('Color palette', data.get('colorPalette')));
      lines.push(buildSection('Materials & finishes', data.get('materials')));
      lines.push(buildSection('Preferred brands / retailers', data.get('brands')));
      lines.push(buildSection('Hard no’s', data.get('avoid')));
      lines.push('--- Logistics ---');
      lines.push(buildSection('Investment range', data.get('budget')));
      lines.push(buildSection('Decision makers', data.get('decisionMakers')));
      lines.push(buildSection('Meeting style', data.get('meetingStyle')));
      lines.push(buildSection('Vendors already engaged', data.get('vendors')));
      lines.push('--- Photos & inspiration ---');
      const inspiration = buildSection('Links to inspo', data.get('inspirationLinks'));
      if (inspiration) lines.push(inspiration);
      const fileShare = buildSection('File share link', data.get('fileShare'));
      if (fileShare) lines.push(fileShare);
      const selectedPhotos = photoInput && photoInput.files ? Array.from(photoInput.files).map(file => file.name) : [];
      if (selectedPhotos.length) {
        lines.push(`Attached photo files: ${selectedPhotos.join(', ')}`);
      }
      lines.push('--- Extra notes ---');
      lines.push(buildSection('Additional context', data.get('extras')));

      const cleaned = lines.filter(Boolean).join('\n\n');
      summaryOutput.value = cleaned || 'No responses captured.';
      if (statusEl) {
        statusEl.textContent = 'Summary ready! Copy it below and email it with your photos to omnilend.co@gmail.com.';
      }
      if (summarySection) {
        summarySection.hidden = false;
        summarySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
