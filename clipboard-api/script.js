document.addEventListener('DOMContentLoaded', () => {
  const pasteBtn = document.querySelector('.paste-btn');
  const copyBtn = document.querySelector('.copy-btn');

  const resultsEl = document.querySelector('.clipboard-results');
  const inputEl = document.querySelector('.to-copy');

  const supportEl = document.querySelector('.no-support');

  if (!navigator.clipboard) {
    supportEl.style.display = 'block';
  } else {
    supportEl.style.display = 'none';
  }

  const readFromClipboard = async (e) => {
    try {
      const text = await navigator.clipboard.readText();
      resultsEl.innerText = text;
      if (e.type === 'paste') {
        console.log('Pasted text: ', text);
      }
    } catch (error) {
      console.error(error.name, error.message);
    }
  };

  const writeToClipboard = async () => {
    const inputValue = inputEl.innerText.trim();
    if (!inputValue) return;
    try {
      await navigator.clipboard.writeText(inputValue);
      if (copyBtn.innerText !== 'Copied!') {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Copied!';
        setTimeout(() => {
          copyBtn.innerText = originalText;
        }, 1500);
      }
    } catch (error) {
      console.error(error.name, error.message);
    }
  };

  const handleWriteToClipboard = async (e) => {
    e.preventDefault();
    try {
      const text = e.target.innerText;
      await navigator.clipboard.writeText(text);
      console.log('Copied text: ', text);
    } catch (err) {
      console.error(err.name, err.message);
    }
  };

  pasteBtn.addEventListener('click', readFromClipboard);
  copyBtn.addEventListener('click', writeToClipboard);

  document.addEventListener('copy', handleWriteToClipboard);
  document.addEventListener('paste', readFromClipboard);
});
