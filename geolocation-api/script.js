document.addEventListener("DOMContentLoaded", () => {
  const $findBtn = document.querySelector("#find-me");
  const $status = document.querySelector("#status");
  const $mapLink = document.querySelector("#map-link");
  const $stopLiveLocation = document.querySelector("#stopLiveLocation");
  const $liveLocation = document.querySelector("#liveLocation");
  const $startLiveLocation = document.querySelector("#startLiveLocation");
  let watchPositionId = null;

  const options = {
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 5000,
  };

  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    $status.style.color = null;
    $status.textContent = "";
    $mapLink.href = `https://www.google.com/maps/@${latitude},${longitude},20z`;
    $mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  }

  function updateLiveLocation(position) {
    const $location = document.querySelector("#locationData");
    $location.innerHTML = "";
    for (key in position.coords) {
      $location.innerHTML += `<p>${key}: ${position.coords[key]}</p>`;
    }
  }

  function showError(error) {
    $status.style.color = "red";
    switch (error.code) {
      case error.PERMISSION_DENIED:
        $status.textContent = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        $status.textContent = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        $status.textContent = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        $status.textContent = "An unknown error occurred.";
        break;
    }
    console.log(error.message);
  }

  function clearWatch() {
    navigator.geolocation.clearWatch(watchPositionId);
    watchPositionId = null;
  }
  function getLiveLocation() {
    watchPositionId = navigator.geolocation.watchPosition(
      updateLiveLocation,
      (error) => console.log(error),
      options
    );
  }
  function geoFindMe() {
    $mapLink.href = "";
    $mapLink.textContent = "";

    if (!navigator.geolocation) {
      $status.style.color = "red";
      $status.textContent = "Geolocation is not supported by your browser";
    } else {
      $status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(
        showPosition,
        showError,
        options
      );
      $liveLocation.toggleAttribute("hidden");
    }
  }

  $findBtn.addEventListener("click", geoFindMe);
  $startLiveLocation.addEventListener("click", getLiveLocation);
  $stopLiveLocation.addEventListener("click", clearWatch);
});
