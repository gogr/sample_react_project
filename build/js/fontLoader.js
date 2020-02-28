(function() {
  //https://fonts.googleapis.com/css?family=Roboto

  const jamFont = (name, css) => {
    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
    document.documentElement.classList.add('fontLoaded-' + name);
  }

  const loadFont = (name, url) => {
    // the 'fetch' equivalent has caching issues
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let css = xhr.responseText;
        css = css.replace(/}/g, 'font-display: swap; }');
        jamFont(name, css);
        sessionStorage['font' + name] = css;
      }
    };
    xhr.send();
  }

  if (sessionStorage.fontRoboto) {
    jamFont('Roboto', sessionStorage.fontRoboto);
  } else {
    loadFont('Roboto', 'https://fonts.googleapis.com/css?family=Roboto');
  }


})();
