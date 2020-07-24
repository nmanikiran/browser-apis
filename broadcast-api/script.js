document.addEventListener('DOMContentLoaded', () => {
  const $title = document.querySelector('#title');
  const $form = document.querySelector('form');
  const $support = document.querySelector('#support');
  $support.hidden = true;
  let bc;
  try {
    bc = new BroadcastChannel('test_channel');
  } catch (error) {
    $support.hidden = false;
    return;
  }

  const postMessage = () => {
    const title = $title.value;
    if (!title) return;
    bc.postMessage(title);
    setTimeout(() => {
      $title.value = '';
    }, 1000);
  };

  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    postMessage();
  });

  bc.onmessage = function (ev) {
    document.title = ev.data;
  };
});
