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
    console.log("A new session");
    console.log("session start" + (Date.now() - Number(localStorage.getItem("session-start-time"))) / 1e3);
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
    static time = Date.now();
    static sessionTimer() {
      let sessionStartTime = localStorage.getItem("session-start-time");
      if (!sessionStartTime) {
        localStorage.setItem("session-start-time", Date.now().toString());
      }
    }
  };
  function checkForNewSession() {
    let timeSinceLastUpdate = Date.now() - Number(localStorage.getItem("at-last-active") || 0);
    console.log("Time since last update: " + timeSinceLastUpdate);
    localStorage.setItem("at-last-active", Date.now().toString());
    if (timeSinceLastUpdate > time) {
      localStorage.removeItem("session-start-time");
      newSession();
    }
  }
  var updateActivity = throttle(() => {
    checkForNewSession();
  }, 1500);

  // dist/trackers/performance.js
  function performanceDomLoadSpeed() {
    window.addEventListener("load", () => {
      const navEntries = performance.getEntriesByType("navigation")[0];
      const perfEntry = navEntries;
      const domContentLoadedTime = (perfEntry.domContentLoadedEventEnd - perfEntry.startTime).toFixed(2);
      console.log(`DOM Content Loaded: ${domContentLoadedTime} ms`);
    });
  }

  // dist/index.js
  document.addEventListener("DOMContentLoaded", () => {
    trackButtons();
  });
  performanceDomLoadSpeed();
  sessionManager.sessionCounter();
  sessionManager.sessionTimer();
})();
