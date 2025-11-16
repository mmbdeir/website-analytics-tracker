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
    localStorage.setItem("session-start-time", Date.now().toString());
  }
  var SessionManager = class {
    static sessionCounter() {
      checkForNewSession();
      window.addEventListener("click", updateActivity);
      window.addEventListener("scroll", updateActivity);
      window.addEventListener("keydown", updateActivity);
      window.addEventListener("mousemove", updateActivity);
      window.addEventListener("touchstart", updateActivity);
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
      document.addEventListener("beforeunload", (e) => {
        e.preventDefault();
        navigator.sendBeacon("Use cloud run url to host the function, im using sendBeacon so it still runs if the tab closes", JSON.stringify({ pageLeft: window.location.pathname }));
      });
    }
    // Track what page the user came from and where did he go after
    static navPaths() {
      const navPaths = [location.pathname];
      window.addEventListener("popstate", () => {
        navPaths.push(location.pathname);
      });
      const originalPushState = history.pushState;
      history.pushState = function(...args) {
        originalPushState.apply(history, args);
        navPaths.push(location.pathname);
      };
      const originalReplaceState = history.replaceState;
      history.replaceState = function(...args) {
        originalReplaceState.apply(history, args);
        navPaths.push(location.pathname);
      };
      window.addEventListener("beforeunload", (e) => {
        e.preventDefault();
        navPaths.forEach((e2, i) => {
          navigator.sendBeacon("Maybe not cloud run, if fire/supabase lets me use a url then do it", JSON.stringify({
            page: e2,
            pageFrom: i > 0 ? navPaths[i - 1] : void 0,
            pageTo: navPaths[i + 1]
          }));
        });
      });
    }
    static scrollDepth() {
      let maxDepth = 0;
      let clientHeight = document.documentElement.clientHeight;
      function getScrollDepthPercent() {
        let scrollHeight = document.documentElement.scrollHeight;
        const maxScroll = scrollHeight - clientHeight;
        const scroll = window.scrollY;
        if (maxScroll <= 0)
          return 100;
        return scroll / maxScroll * 100;
      }
      window.addEventListener("scrollend", () => {
        const currentDepth = getScrollDepthPercent();
        if (currentDepth > maxDepth) {
          maxDepth = currentDepth;
        }
      });
      window.addEventListener("beforeunload", () => {
      });
    }
  };

  // dist/index.js
  document.addEventListener("DOMContentLoaded", () => {
    trackButtons();
  });
  loadSpeed();
  SessionManager.sessionCounter();
  PageSpecific.pageLeft();
  PageSpecific.navPaths();
  PageSpecific.scrollDepth();
})();
