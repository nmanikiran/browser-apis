document.addEventListener('DOMContentLoaded', () => {
  const $img = document.querySelector('img');
  const $video = document.querySelector('video');
  const $captureBtn = document.querySelector('#screenshot');
  const $canvas = document.createElement('canvas');

  // Older browsers might not implement mediaDevices at all, so we set an empty object first
  navigator.mediaDevices = navigator.mediaDevices || {};

  // Some browsers partially implement mediaDevices. We can't just assign an object
  // with getUserMedia as it would overwrite existing properties.
  // Here, we will just add the getUserMedia property if it's missing.
  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function (constraints) {
      // First get ahold of the legacy getUserMedia, if present
      var getUserMedia =
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      // Some browsers just don't implement it - return a rejected promise with an error
      // to keep a consistent interface
      if (!getUserMedia) {
        return Promise.reject(
          new Error('getUserMedia is not implemented in this browser')
        );
      }

      // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
      return new Promise(function (resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }

  navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true
    })
    .then(function (stream) {
      // Older browsers may not have srcObject
      if ('srcObject' in $video) {
        $video.srcObject = stream;
      } else {
        // Avoid using this in new browsers, as it is going away.
        $video.src = window.URL.createObjectURL(stream);
      }
      $video.onloadedmetadata = function (e) {
        $video.play();
      };
    })
    .catch(function (err) {
      console.log(err.name + ': ' + err.message);
    });

  $captureBtn.addEventListener('click', function () {
    $canvas.width = $video.videoWidth;
    $canvas.height = $video.videoHeight;
    $canvas.getContext('2d').drawImage($video, 0, 0);
    // Other browsers will fall back to image/png
    $img.src = $canvas.toDataURL('image/webp');
  });
});
