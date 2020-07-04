document.addEventListener('DOMContentLoaded', () => {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
  var SpeechRecognitionEvent =
    SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

  const colors = [
    'aqua',
    'azure',
    'beige',
    'bisque',
    'black',
    'blue',
    'brown',
    'chocolate',
    'coral',
    'crimson',
    'cyan',
    'fuchsia',
    'ghostwhite',
    'gold',
    'goldenrod',
    'gray',
    'green',
    'indigo',
    'ivory',
    'khaki',
    'lavender',
    'lime',
    'linen',
    'magenta',
    'maroon',
    'moccasin',
    'navy',
    'olive',
    'orange',
    'orchid',
    'peru',
    'pink',
    'plum',
    'purple',
    'red',
    'salmon',
    'sienna',
    'silver',
    'snow',
    'tan',
    'teal',
    'thistle',
    'tomato',
    'turquoise',
    'violet',
    'white',
    'yellow'
  ];
  const grammar =
    '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;';

  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  //recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const $diagnostic = document.querySelector('.output');
  const $bg = document.querySelector('html');
  const $hints = document.querySelector('.hints');

  let colorHTML = '';
  colors.forEach((v, i, a) => {
    colorHTML += `<span style="background-color:${v};">${v}</span>`;
  });
  $hints.innerHTML = ` ${colorHTML}. `;

  document.addEventListener('click', function () {
    recognition.start();
    console.log('Ready to receive a color command.');
  });

  recognition.onresult = function (event) {
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The [last] returns the SpeechRecognitionResult at the last position.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object

    const last = event.results.length - 1;
    const color = event.results[last][0].transcript;

    $diagnostic.textContent = `Result received: ${color}.`;

    $bg.style.backgroundColor = color;
    console.log('Confidence: ' + event.results[0][0].confidence);
  };

  recognition.onspeechend = function () {
    recognition.stop();
  };

  recognition.onnomatch = function (event) {
    $diagnostic.textContent = "I didn't recognise that color.";
  };

  recognition.onerror = function (event) {
    $diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
  };
  recognition.onaudiostart = function (event) {
    //Fired when the user agent has started to capture audio.
    console.log('SpeechRecognition.onaudiostart');
  };

  recognition.onaudioend = function (event) {
    //Fired when the user agent has finished capturing audio.
    console.log('SpeechRecognition.onaudioend');
  };

  recognition.onend = function (event) {
    //Fired when the speech recognition service has disconnected.
    console.log('SpeechRecognition.onend');
  };

  recognition.onsoundstart = function (event) {
    //Fired when any sound — recognisable speech or not — has been detected.
    console.log('SpeechRecognition.onsoundstart');
  };

  recognition.onsoundend = function (event) {
    //Fired when any sound — recognisable speech or not — has stopped being detected.
    console.log('SpeechRecognition.onsoundend');
  };

  recognition.onspeechstart = function (event) {
    //Fired when sound that is recognised by the speech recognition service as speech has been detected.
    console.log('SpeechRecognition.onspeechstart');
  };
  recognition.onstart = function (event) {
    //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
    console.log('SpeechRecognition.onstart');
  };
});
