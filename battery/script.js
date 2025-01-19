document.addEventListener("DOMContentLoaded", async () => {
  const $charging = document.querySelector("#chargingStatus");
  const $dischargingTime = document.querySelector("#dischargingTime");
  const $level = document.querySelector("#level");
  let battery = {};

  function updateBatteryStatus(battery) {
    $charging.textContent = battery.charging ? "Charging" : "NOT Charging";
    $charging.style.color = battery.charging ? "green" : "red";
    $level.textContent = `${battery.level * 100}%`;
    if (battery.dischargingTime !== Infinity) {
      $dischargingTime.textContent = `${parseFloat(
        battery.dischargingTime / 60 / 60
      ).toFixed(2)}h`;
    }
  }

  try {
    battery = await navigator.getBattery();
    // Update the battery status initially when the promise resolves ...
    updateBatteryStatus(battery);

    // .. and for any subsequent updates.
    battery.addEventListener("chargingchange", (e) => {
      updateBatteryStatus(e.target);
    });

    battery.addEventListener("levelchange", (e) => {
      updateBatteryStatus(e.target);
    });

    battery.addEventListener("chargingtimechange", (e) => {
      updateBatteryStatus(e.target);
    });

    battery.addEventListener("dischargingtimechange", (e) => {
      updateBatteryStatus(e.target);
    });
  } catch (error) {
    console.log(error);
  }
});
