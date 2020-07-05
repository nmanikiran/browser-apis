document.addEventListener('DOMContentLoaded', () => {
  const $charging = document.querySelector('#chargingStatus');
  const $dischargingTime = document.querySelector('#dischargingTime');
  const $level = document.querySelector('#level');

  function updateBatteryStatus(battery) {
    $charging.textContent = battery.charging ? 'Charging' : 'NOT Charging';
    $charging.style.color = battery.charging ? 'green' : 'red';
    $level.textContent = `${battery.level * 100}%`;
    if (battery.dischargingTime !== Infinity) {
      $dischargingTime.textContent = `${parseFloat(
        battery.dischargingTime / 60 / 60
      ).toFixed(2)}h`;
    }
  }

  navigator.getBattery().then(function (battery) {
    // Update the battery status initially when the promise resolves ...
    updateBatteryStatus(battery);

    // .. and for any subsequent updates.
    battery.onchargingchange = function () {
      updateBatteryStatus(battery);
    };

    battery.onlevelchange = function () {
      updateBatteryStatus(battery);
    };

    battery.ondischargingtimechange = function () {
      updateBatteryStatus(battery);
    };
  });
});
