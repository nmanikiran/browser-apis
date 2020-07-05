document.addEventListener('DOMContentLoaded', () => {
  let shareData = {
    title: 'Mani kiran N',
    text: 'Restorative | Deliberative | Learner | Achiever | Responsibility!',
    url: 'https://github.com/nmanikiran'
  };

  const $btn = document.querySelector('#share');
  const $resultPara = document.querySelector('.result');
  $resultPara.hidden = true;
  $btn.addEventListener('click', () => {
    navigator
      .share(shareData)
      .then(() => (resultPara.textContent = 'Shared successfully'))
      .catch((e) => (resultPara.textContent = 'Error: ' + e));
  });
  if (!navigator.share) {
    $btn.style.display = 'none';
    $resultPara.hidden = false;
    $resultPara.style.color = 'red';
  }
});
