document.addEventListener('DOMContentLoaded', () => {
  let shareData = {
    title: 'Mani kiran N',
    text: 'Restorative | Deliberative | Learner | Achiever | Responsibility!',
    url: 'https://github.com/nmanikiran'
  };

  const $btn = document.querySelector('button');
  const $resultPara = document.querySelector('.result');

  $btn.addEventListener('click', () => {
    navigator
      .share(shareData)
      .then(() => (resultPara.textContent = 'MDN shared successfully'))
      .catch((e) => (resultPara.textContent = 'Error: ' + e));
  });
  if (!navigator.share) {
    $btn.style.display = 'none';
    $resultPara.innerHTML =
      '<a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share" >Web share</a> is not supported by your browser';
    $resultPara.style.color = 'red';
  }
});
