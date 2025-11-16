"use strict";
(() => {
  // dist/trackers/click.js
  function trackButtons() {
    document.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "button") {
        console.log("Button click!!");
      }
    });
  }

  // dist/reusables/throttle.js
  function throttle(fn, delay) {
    let isThr = true;
    return function() {
      if (isThr) {
        fn();
        isThr = false;
        setTimeout(() => isThr = true, delay);
      }
    };
  }

  // dist/trackers/session.js
  var time = 60 * 60 * 1e3;
  function newSession() {
    console.log("prev sess time:" + (Date.now() - Number(localStorage.getItem("session-start-time"))));
    localStorage.removeItem("session-start-time");
    localStorage.setItem("session-start-time", Date.now().toString());
  }
  var SessionManager = class {
    static sessionCounter() {
      checkForNewSession();
      window.onclick = updateActivity;
      window.onscroll = updateActivity;
      window.onkeydown = updateActivity;
      window.onmousemove = updateActivity;
      window.ontouchstart = updateActivity;
    }
    static sessionTimer() {
      let sessionStartTime = localStorage.getItem("session-start-time");
      if (!sessionStartTime) {
        localStorage.setItem("session-start-time", Date.now().toString());
      }
    }
  };
  function checkForNewSession() {
    let timeSinceLastUpdate = Date.now() - Number(localStorage.getItem("at-last-active") || 0);
    localStorage.setItem("at-last-active", Date.now().toString());
    if (timeSinceLastUpdate > time) {
      newSession();
    }
  }
  var updateActivity = throttle(() => {
    checkForNewSession();
  }, 1500);

  // dist/trackers/performance.js
  function loadSpeed() {
    window.addEventListener("DOMContentLoaded", () => {
      console.log(`Loaded Speed: ${performance.now().toFixed(1)} ms`);
    });
  }

  // dist/trackers/page_specific.js
  var PageSpecific = class {
    // Amount of sessions per page
    // - on page open(not reload) a new page session with the pages name from the metadata, and its url
    // From what page this user came from to get to this page
    static pageLeft() {
      window.addEventListener("beforeunload", (e) => {
        e.preventDefault();
        navigator.sendBeacon("Use cloud run url to host the function, im using sendBeacon so it still runs if the tab closes", JSON.stringify({ pageLeft: window.location.pathname }));
      });
    }
    static visitsPerPage() {
    }
  };

  // dist/index.js
  document.addEventListener("DOMContentLoaded", () => {
    trackButtons();
  });
  loadSpeed();
  SessionManager.sessionCounter();
  SessionManager.sessionTimer();
  PageSpecific.pageLeft();
})();
