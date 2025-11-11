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
  var time = 2e3;
  function newSession() {
    console.log("prev sess time:" + (Date.now() - Number(localStorage.getItem("session-start-time"))));
    localStorage.removeItem("session-start-time");
    localStorage.setItem("session-start-time", Date.now().toString());
  }
  var sessionManager = class {
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

  // dist/index.js
  document.addEventListener("DOMContentLoaded", () => {
    trackButtons();
  });
  loadSpeed();
  sessionManager.sessionCounter();
  sessionManager.sessionTimer();
})();
