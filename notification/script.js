document.addEventListener('DOMContentLoaded', () => {
  const $notify = document.querySelector('#notify');
  const $blockquote = document.querySelector('blockquote');
  const $title = document.querySelector('#title');
  const $icon = document.querySelector('#icon');
  const $actions = document.querySelector('#actions');
  const $badge = document.querySelector('#badge');
  const $requireInteraction = document.querySelector('#require-interaction');

  $blockquote.hidden = true;
  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    $blockquote.hidden = false;
  }

  function getPermission() {
    return new Promise((resolve, reject) => {
      try {
        // Let's check whether notification permissions have already been granted
        if (Notification.permission === 'granted') resolve();
        if (Notification.permission !== 'denied') {
          // Otherwise, we need to ask the user for permission
          Notification.requestPermission().then(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === 'granted') {
              resolve();
            }
          });
        }
      } catch (error) {
        reject();
      }
    });
  }

  $notify.addEventListener('click', () => {
    getPermission().then(() => {
      new Notification('Hi there!');
    });
  });
  $title.addEventListener('click', () => {
    getPermission().then(() => {
      var options = {
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
      };
      new Notification('Hi there!', options);
    });
  });
  $icon.addEventListener('click', () => {
    getPermission().then(() => {
      var options = {
        icon: './assets/icon.jpg',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
      };
      new Notification('Notification Icon', options);
    });
  });
  $actions.addEventListener('click', () => {
    getPermission().then(() => {
      var options = {
        icon: './assets/icon.jpg',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ',
        actions: [
          { action: 'yes', title: 'Yes' },
          { action: 'no', title: 'No' }
        ]
      };
      new Notification('Notification Actions', options);
    });
  });
  $requireInteraction.addEventListener('click', () => {
    getPermission().then(() => {
      var options = {
        icon: './assets/icon.jpg',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ',
        requireInteraction: true
      };
      new Notification('Notification Require Interaction', options);
    });
  });

  $badge.addEventListener('click', () => {
    getPermission().then(() => {
      var options = {
        icon: './assets/icon.jpg',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ',
        badge: true
      };
      new Notification('Notification Badge', options);
    });
  });
});
