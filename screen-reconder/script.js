(function () {
  let stream, audio;
  let mediaRecorder;
  let videoUrl;
  let chunks = [];
  let $startBtn, $play, $download, $video, $stop;
  const mediaType = "video/mp4";

  const stopRecording = () => {
    let blob = new Blob(chunks, {
      type: mediaType,
    });
    videoUrl = URL.createObjectURL(blob);
    stream.getTracks().forEach((track) => track.stop());
    audio.getTracks().forEach((track) => track.stop());
    mediaRecorder.stop();
    $stop.disabled = true;
    $play.removeAttribute("disabled");
    $download.removeAttribute("disabled");
  };
  const playRecording = () => {
    if (videoUrl) {
      $video.hidden = false;
      $video.src = videoUrl;
      $video.onloadedmetadata = function (e) {
        $video.play();
      };
    }
  };
  const downloadRecording = () => {
    if (videoUrl) {
      const name = window.prompt("Enter name of the video");
      let a = document.createElement("a");
      a.href = videoUrl;
      a.download = `${name}.mp4`;
      a.click();
    }
  };
  const startRecording = async () => {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
      },
    });
    //needed for better browser support
    const mediaSteam = new MediaStream([
      ...stream.getTracks(),
      ...audio.getTracks(),
    ]);
    mediaRecorder = new MediaRecorder(mediaSteam);

    mediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data);
    };

    mediaRecorder.addEventListener("stop", stopRecording);
    mediaRecorder.onstop = stopRecording;

    //we have to start the recorder manually
    mediaRecorder.start();
    $stop.removeAttribute("disabled");
  };
  document.addEventListener("DOMContentLoaded", function () {
    $startBtn = document.querySelector(".record-btn");
    $play = document.querySelector(".play-btn");
    $download = document.querySelector(".download-btn");
    $video = document.querySelector("video");
    $stop = document.querySelector(".stop-btn");

    $startBtn.addEventListener("click", startRecording);
    $stop.addEventListener("click", stopRecording);

    $play.addEventListener("click", playRecording);
    $download.addEventListener("click", downloadRecording);
  });
})();
