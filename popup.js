function checkEnv() {
  var curURL, imgURL;

  if (window.location.href.match(/localhost:3000\/console(?:\/.*)?(?:\?.*)?$/)) {
    curURL = "mission-control";
  } else if (window.location.href.match(/localhost:3000\/graphiql(?:\/.*)?(?:\?.*)?$/)) {
    curURL = "graphiql";
  }

  function icoLoad() {
    document.head = document.head || document.getElementsByTagName("head")[0];

    function removeOldFavicons() {
      var shortcut = document.querySelector('link[rel="shortcut icon"]');
      var favs = document.querySelectorAll('link[rel="icon"]');
      shortcut.remove();
      for (var i = 0; i < favs.length; i++) {
        favs[i].remove();
      }
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

    var cE = chrome.extension;

    switch (curURL) {
      case "mission-control":
        imgURL = cE.getURL("icon-green.ico");
        break;
      case "graphiql":
        imgURL = cE.getURL("icon-purple.ico");
        break;
    }

    removeOldFavicons();
    changeFavicon(imgURL);
  }

  icoLoad();
}

window.onload = checkEnv();