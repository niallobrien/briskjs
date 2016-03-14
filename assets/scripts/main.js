import pjax from 'simple-pjax'

// Timeout before calling the loading indicator function. Set to 0 to disable.
pjax.indicateLoadAfter = 100

// Called when loading takes a while. Use it to display a custom loading indicator.
pjax.onIndicateLoadStart = function() {
  document.documentElement.style.opacity = 0.5
}

// Called when loading ends. Use it to hide a custom loading indicator.
pjax.onIndicateLoadEnd = function() {
  document.documentElement.style.opacity = null
}

$(document).ready(function() {

  // Place JavaScript code here...

})