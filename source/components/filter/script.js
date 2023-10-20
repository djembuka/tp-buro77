window.addEventListener('DOMContentLoaded', () => {
  let loadedFlag = false;

  const options = {
    threshold: 0,
  };

  const observer = new IntersectionObserver(callback, options);

  let target = document.querySelector('#b77Filter');

  if (target) {
    observer.observe(target);
  }

  function callback(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !loadedFlag) {
        loadFilter();
      }
    });
  }

  async function loadFilter() {
    let controller = new AbortController(),
      response,
      result;

    setTimeout(() => {
      if (!response) {
        controller.abort();
      }
    }, 20000);

    try {
      response = await fetch(target.getAttribute('data-url'), {
        method: 'GET',
        signal: controller.signal,
      });

      result = await response.text();

      if (result) {
        loadedFlag = true;
        target.innerHTML = result;

        //stye
        let responseCSS = await fetch(target.getAttribute('data-css'));
        let css = await responseCSS.text();

        const style = document.createElement('style');
        style.textContent = css;

        document.querySelector('head').append(style);

        //script
        let responseJS = await fetch(target.getAttribute('data-js'));
        let js = await responseJS.text();

        const script = document.createElement('script');
        script.textContent = js;

        document.querySelector('body').append(script);
      }
    } catch (err) {
      throw err;
    }
  }
});
