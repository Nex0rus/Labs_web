document.addEventListener('DOMContentLoaded', function() {
  var currentPage = document.location.href;
  var menuItems = document.querySelectorAll('.nav__item .nav__link');
  for (var i = 0; i < menuItems.length; i++) {
    var menuItem = menuItems[i];
    if (menuItem.href === currentPage) {
      menuItem.classList.add('current-page');
      menuItem.classList.add('current-page__text')
    }
  }
});
