document.addEventListener("DOMContentLoaded", () => {
  const $orientation = document.querySelector("#orientation");
  const $lockButton = document.querySelector("#lockButton");
  const $unlockButton = document.querySelector("#unlockButton");

  function handleOrientationChange(event) {
    console.log(event);
    const { type, angle } = event;
    //portrait-primary, portrait-secondary, landscape-primary, or landscape-secondary.
    $orientation.textContent = `ScreenOrientation change: ${type}, ${angle} degrees.`;
  }
  handleOrientationChange(screen.orientation);
  screen.orientation.addEventListener("change", handleOrientationChange);

  $lockButton.addEventListener("click", () => {
    screen.orientation.lock("portrait-primary");
  });

  $unlockButton.addEventListener("click", () => {
    screen.orientation.unlock();
  });
});
