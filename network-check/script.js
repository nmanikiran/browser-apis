document.addEventListener('DOMContentLoaded', () => {
  function hasNetwork(online) {
    const element = document.querySelector('.status');
    // Update the DOM to reflect the current status
    if (online) {
      element.style.backgroundColor = 'green';
      element.innerText = 'Online';
    } else {
      element.style.backgroundColor = 'red';
      element.innerText = 'Offline';
    }
  }
  hasNetwork(navigator.onLine);

  window.addEventListener('online', () => {
    // Set hasNetwork to online when they change to online.
    hasNetwork(true);
  });

  window.addEventListener('offline', () => {
    // Set hasNetwork to offline when they change to offline.
    hasNetwork(false);
  });
});
