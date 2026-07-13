(function () {
  var indicator = document.getElementById("external-js-indicator");
  if (indicator) {
    indicator.textContent = "External JS loaded successfully";
    indicator.style.color = "green";
  }
})();
