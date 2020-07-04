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

  const readFromClipboard = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        resultsEl.innerText = text;
      })
      .catch((err) => {
        console.log('Something went wrong', err);
      });
  };

  const writeToClipboard = () => {
    const inputValue = inputEl.innerText.trim();
    if (!inputValue) return;
    navigator.clipboard
      .writeText(inputValue)
      .then(() => {
        inputEl.value = '';
        if (copyBtn.innerText !== 'Copied!') {
          const originalText = copyBtn.innerText;
          copyBtn.innerText = 'Copied!';
          setTimeout(() => {
            copyBtn.innerText = originalText;
          }, 1500);
        }
      })
      .catch((err) => {
        console.log('Something went wrong', err);
      });
  };
  pasteBtn.addEventListener('click', readFromClipboard);

  copyBtn.addEventListener('click', writeToClipboard);
});
