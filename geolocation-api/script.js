document.addEventListener('DOMContentLoaded', () => {
  const $findBtn = document.querySelector('#find-me');
  const $status = document.querySelector('#status');
  const $mapLink = document.querySelector('#map-link');
  const optn = {
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0
  };
  function geoFindMe() {
    $mapLink.href = '';
    $mapLink.textContent = '';

    function showPosition(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      $status.style.color = null;
      $status.textContent = '';
      $mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      $mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }

    function showError(error) {
      $status.style.color = 'red';
      switch (error.code) {
        case error.PERMISSION_DENIED:
          $status.textContent = 'User denied the request for Geolocation.';
          break;
        case error.POSITION_UNAVAILABLE:
          $status.textContent = 'Location information is unavailable.';
          break;
        case error.TIMEOUT:
          $status.textContent = 'The request to get user location timed out.';
          break;
        case error.UNKNOWN_ERROR:
          $status.textContent = 'An unknown error occurred.';
          break;
      }
    }

    if (!navigator.geolocation) {
      $status.style.color = 'red';
      $status.textContent = 'Geolocation is not supported by your browser';
    } else {
      $status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(showPosition, showError, optn);
    }
  }

  $findBtn.addEventListener('click', geoFindMe);
});
