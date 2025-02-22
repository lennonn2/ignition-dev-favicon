function checkEnv() {
  var curURL, imgURL;

  if (
    window.location.href.match(/localhost:3000\/console(?:\/.*)?(?:\?.*)?$/)
  ) {
    curURL = "mission-control";
  } else if (
    window.location.href.match(/localhost:3000\/graphiql(?:\/.*)?(?:\?.*)?$/)
  ) {
    curURL = "graphiql";
  }

  function icoLoad() {
    document.head = document.head || document.getElementsByTagName("head")[0];

    function removeOldFavicons() {
      var shortcut = document.querySelector('link[rel="shortcut icon"]');
      var favs = document.querySelectorAll('link[rel="icon"]');
      if (shortcut) shortcut.remove();
      favs.forEach((fav) => fav.remove());
    }

    function changeFavicon(src) {
      var link = document.createElement("link"),
        oldLink = document.getElementById("dynamic-favicon");
      link.id = "dynamic-favicon";
      link.rel = "shortcut icon";
      link.href = src;
      if (oldLink) document.head.removeChild(oldLink);
      document.head.appendChild(link);
    }

    // Use chrome.runtime.getURL() in Manifest V3
    var cR = chrome.runtime;

    switch (curURL) {
      case "mission-control":
        imgURL = cR.getURL("favicon-green.ico");
        break;
      case "graphiql":
        imgURL = cR.getURL("favicon-purple.ico");
        break;
    }

    removeOldFavicons();
    changeFavicon(imgURL);
  }

  icoLoad();
}

window.onload = checkEnv();
