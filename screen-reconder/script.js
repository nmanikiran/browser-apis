document.addEventListener("DOMContentLoaded", function () {
  const $btn = document.querySelector(".record-btn");
  const $play = document.querySelector(".play-btn");
  const $download = document.querySelector(".download-btn");
  const $video = document.querySelector("video");

  let mediaRecorder;
  let videoUrl;
  let chunks = [];

  const stopRecording = () => {
    let blob = new Blob(chunks, {
      type: chunks[0].type,
    });
    videoUrl = URL.createObjectURL(blob);
    $play.removeAttribute("disabled");
    $download.removeAttribute("disabled");
  };

  $play.addEventListener("click", function () {
    if (videoUrl) {
      $video.hidden = false;
      $video.src = videoUrl;
      $video.play();
    }
  });

  $download.addEventListener("click", function () {
    if (videoUrl) {
      let a = document.createElement("a");
      a.href = videoUrl;
      a.download = "video.webm";
      a.click();
    }
  });

  $btn.addEventListener("click", async function () {
    let stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    //needed for better browser support
    const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
      ? "video/webm; codecs=vp9"
      : "video/webm";
    mediaRecorder = new MediaRecorder(stream, {
      mimeType: mime,
    });

    mediaRecorder.addEventListener("dataavailable", function (e) {
      chunks.push(e.data);
    });

    mediaRecorder.addEventListener("stop", stopRecording);

    //we have to start the recorder manually
    mediaRecorder.start();
  });
});
