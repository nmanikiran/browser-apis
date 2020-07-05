document.addEventListener('DOMContentLoaded', () => {
  const $once = document.querySelector('.once');
  const $pattern = document.querySelector('.vibrate-pattern');
  const $peristently = document.querySelector('.peristently');
  const $stop = document.querySelector('.stop');
  var vibrateInterval;

  // Starts vibration at passed in level
  $once.addEventListener('click', () => {
    navigator.vibrate(1000);
  });

  $pattern.addEventListener('click', () => {
    navigator.vibrate([1000, 200, 1000, 2000, 400]);
  });

  // Stops vibration
  $stop.addEventListener('click', () => {
    if (vibrateInterval) clearInterval(vibrateInterval);
    navigator.vibrate(0);
  });
  // Start persistent vibration at given duration and interval
  // Assumes a number value is given
  $peristently.addEventListener('click', () => {
    vibrateInterval = setInterval(function () {
      navigator.vibrate(1000);
    }, 1500);
  });
});
