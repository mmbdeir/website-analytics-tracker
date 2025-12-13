import "scrollyfills";
import { isDeviceMobile } from "../reusables/isdevicemobile";
import { OnPageExit } from "../reusables/onpageexist";

const CURRENT_SESSION_START_TIME = "current_session_start_time";

export class PageSpecific {
  private static navPaths: string[] = [];
  static getMaxScrollDepth: () => number = () => 0;

  static init() {
    this.navPaths = [window.location.pathname];
    this.initNavPaths();
    this.getMaxScrollDepth = this.initScrollDepth();
    OnPageExit({
      navPaths: this.navPaths,
      pageLeft: window.location.pathname,
    });
    localStorage.setItem(CURRENT_SESSION_START_TIME, Date.now().toString());
  }

  /** -------------------------
   *  EXIT PAGE FUNCTION
   * ------------------------- */
  /*
  private static OnPageExit() {
    if (isDeviceMobile()) {
      document.addEventListener("visibilitychange", (e) => {
        if (document.visibilityState === "hidden") {
          sendPageMetric({
            navPaths: this.navPaths,
            pageLeft: window.location.pathname,
          });
          console.log("Page Left: " + window.localStorage.pathname);
        }
      });
    } else {
      document.addEventListener("beforeunload", (e) => {
    sendPageMetric({
      navPaths: this.navPaths,
      pageLeft: window.location.pathname,
    });
    console.log("Page Left: " + window.localStorage.pathname);
  });
}
}
*/

  /** -------------------------
   *  NAV PATH TRACKING
   * ------------------------- */
  private static initNavPaths() {
    // If the navigated path is the same as the current path then dont push it to navPaths, cuz that will create "Nav paths: /mw2, /mw2 , /mw2/coming-soon-screen"
    const pushNavPaths = () => {
      let currentPath: string = window.location.pathname;
      if (this.navPaths[this.navPaths.length - 1] !== currentPath) {
        this.navPaths.push(window.location.pathname);
      }
      console.log("Nav paths: " + this.navPaths);
    };

    onNavigation(pushNavPaths);
  }

  /** -------------------------
   *  SCROLL DEPTH TRACKING
   * ------------------------- */
  static initScrollDepth() {
    let maxDepth: number = 0;
    let clientHeight = document.documentElement.clientHeight;

    function getScrollDepthPercent() {
      let scrollHeight = document.documentElement.scrollHeight;
      const maxScroll = scrollHeight - clientHeight;
      const scroll = window.scrollY;
      if (maxScroll <= 0) return 100;
      return (scroll / maxScroll) * 100;
    }

    window.addEventListener("scrollend", () => {
      const currentDepth = getScrollDepthPercent();
      if (currentDepth > maxDepth) {
        maxDepth = currentDepth;
      }
    });
    window.addEventListener("resize", () => {
      clientHeight = document.documentElement.clientHeight;
    });
    return () => Math.round(Math.min(100, maxDepth));
  }
}

/** -------------------------
 *  SEND DATA TO SERVER
 * ------------------------- */
function sendPageMetric(extra: Record<string, any> = {}) {
  const duration = sessionDurationTimer();
  navigator.sendBeacon(
    "ENDPOINT",
    JSON.stringify({
      page: window.location.pathname,
      pageDuration: duration,
      scrollDepth: PageSpecific.getMaxScrollDepth(),
      ...extra,
    })
  );
  console.log("maxDepth of previous: " + PageSpecific.getMaxScrollDepth());
}

/** -------------------------
 *  ON NAVIGATION
 * ------------------------- */
function onNavigation(callback: () => void) {
  const originalPushState = history.pushState;
  history.pushState = function (...args) {
    originalPushState.apply(history, args);
    callback();
    sendPageMetric();
    PageSpecific.getMaxScrollDepth = PageSpecific.initScrollDepth();
  };

  const originalReplaceState = history.replaceState;
  history.replaceState = function (...args) {
    originalReplaceState.apply(history, args);
    callback();
    sendPageMetric();
    PageSpecific.getMaxScrollDepth = PageSpecific.initScrollDepth();
  };
}

/** -------------------------
 *  SESSION DURATION TIMER
 * ------------------------- */
function sessionDurationTimer() {
  const start = Number(localStorage.getItem(CURRENT_SESSION_START_TIME));
  const duration = Date.now() - start;
  localStorage.setItem(CURRENT_SESSION_START_TIME, Date.now().toString());
  console.log("Previous page duration: " + duration);
  return duration;
}
