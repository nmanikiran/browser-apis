(function () {
  function speakMessage(e) {
    e.preventDefault();
    e.stopPropagation();

    let $rate = document.querySelector('#rate');
    let $pitch = document.querySelector('#pitch');
    let selectedVoiceIndex = document.querySelector('#voices').value;
    let text = document.querySelector('#message').value;
    let msg = new SpeechSynthesisUtterance();
    let voices = window.speechSynthesis.getVoices();
    msg.voice = voices[selectedVoiceIndex];
    msg.rate = $rate.value / 10;
    msg.volume = 1;
    msg.pitch = $pitch.value;
    msg.text = text;
    msg.onend = function () {
      console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };

    speechSynthesis.speak(msg);
  }

  function init() {
    let $speak = document.querySelector('#speak');
    let $voicelist = document.querySelector('#voices');
    speechSynthesis.onvoiceschanged = function () {
      if ($voicelist.querySelectorAll('option').length > 0) return;
      speechSynthesis.getVoices().forEach((voice, index) => {
        let $option = document.createElement('option');

        $option.value = index;
        $option.innerHTML = voice.name + (voice.default ? ' (default)' : '');

        $voicelist.append($option);
      });
    };

    $speak.addEventListener('click', speakMessage);
  }

  function onLoadCheckSupport() {
    if ('speechSynthesis' in window) {
      init();
    } else {
      document.querySelector('#suport').classList.remove('hidden');
    }
  }

  document.addEventListener('DOMContentLoaded', onLoadCheckSupport);
})();
