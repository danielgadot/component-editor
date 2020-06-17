function togglePanel() {
    var x = document.querySelector('.panel-wrap');
    var btn = document.querySelector('.toggle-panel');
    if (x.style.display === 'none') {
      x.style.display = 'block';
      btn.classList.remove('right-arrow');
      btn.classList.add('left-arrow');
    } else {
      x.style.display = 'none';
      btn.classList.remove('left-arrow');
      btn.classList.add('right-arrow');
    }
  }