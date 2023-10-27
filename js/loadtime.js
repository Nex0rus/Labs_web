window.addEventListener('load', function() {
  let loadTime = performance.now();
  let pageLoadTimeElement = document.getElementById('pageLoadTime');
  pageLoadTimeElement.textContent = 'Страница загрузилась за ' + loadTime.toFixed(2) + ' миллисекунды';
});
