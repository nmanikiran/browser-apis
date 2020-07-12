document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.iObserve');
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  };
  const onObserve = (entries, observer) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.play();
      } else {
        el.pause();
      }
    });
  };

  const autoPlayVideo = (target) => {
    const io = new IntersectionObserver(onObserve, options);

    io.observe(target);
    target.addEventListener('click', () => {
      target.pause();
    });
  };

  targets.forEach(autoPlayVideo);
});
