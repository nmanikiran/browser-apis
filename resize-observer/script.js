document.addEventListener('DOMContentLoaded', () => {
  if (window.ResizeObserver) {
    const h1El = document.querySelector('h1');
    const pEl = document.querySelector('.main p');
    const divEl = document.querySelector('body  .main');
    const slider = document.querySelector('input[type="range"]');
    const checkbox = document.querySelector('input[type="checkbox"]');

    divEl.style.width = '600px';

    slider.addEventListener('input', () => {
      divEl.style.width = slider.value + 'px';
    });

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentBoxSize) {
          h1El.style.fontSize =
            Math.max(1.5, entry.contentBoxSize.inlineSize / 200) + 'rem';
          pEl.style.fontSize =
            Math.max(1, entry.contentBoxSize.inlineSize / 600) + 'rem';
        } else {
          h1El.style.fontSize =
            Math.max(1.5, entry.contentRect.width / 200) + 'rem';
          pEl.style.fontSize =
            Math.max(1, entry.contentRect.width / 600) + 'rem';
        }
      }
    });

    resizeObserver.observe(divEl);

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        resizeObserver.observe(divEl);
      } else {
        resizeObserver.unobserve(divEl);
      }
    });
  } else {
    console.log('Resize observer not supported!');
  }
});
