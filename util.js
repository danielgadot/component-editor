function togglePanel() {
    var x = document.querySelector('.panel-wrap');
    var btn = document.querySelector('.toggle-panel');
    if (x.style.visibility === 'hidden') {
      x.style.visibility = 'visible';
      btn.classList.remove('right-arrow');
      btn.classList.add('left-arrow');
    } else {
      x.style.visibility = 'hidden';
      btn.classList.remove('left-arrow');
      btn.classList.add('right-arrow');
    }
  }