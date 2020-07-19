document.addEventListener('DOMContentLoaded', () => {
  const $quota = document.querySelector('#quota');
  const $used = document.querySelector('#used');
  const $remaining = document.querySelector('#remaining');
  const $blockquote = document.querySelector('blockquote');

  $blockquote.hidden = true;

  if (navigator.storage && navigator.storage.estimate) {
    navigator.storage.estimate().then((data) => {
      // Chrome uses max 80% total
      // Storage will use 70 - 75%
      $quota.innerText = `${parseFloat(data.quota / 1000 / 1000 / 1000).toFixed(
        2
      )} GB`;
      $used.innerText = data.usage;
      $remaining.innerText = JSON.stringify(data.usageDetails);
    });
  } else {
    $blockquote.hidden = false;
  }
});
