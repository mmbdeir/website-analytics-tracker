import "scrollyfills";

const CURRENT_SESSION_START_TIME = "current_session_start_time";

export class PageSpecific {
  private static initialized = false;
  private static navPaths: string[] = [];
  static getMaxScrollDepth: () => number = () => 0;

  static init() {
    if (this.initialized) return;
    this.initialized = true;
    this.navPaths = this.initNavPaths();

    this.getMaxScrollDepth = this.initScrollDepth();
    this.initVisibilityHandler();
  }
  // Amount of sessions per page
  // - on page open(not reload) a new page session with the pages name from the metadata, and its url
  // From what page this user came from to get to this page
  private static initVisibilityHandler() {
    document.addEventListener("visibilitychange", (e) => {
      if (document.visibilityState !== "hidden") return;
      sendPageMetric({
        navPaths: this.navPaths,
        pageLeft: window.location.pathname,
      });
    });
  }

  // Track what page the user came from and where did he go after
  private static initNavPaths(): string[] {
    const navPaths = [window.location.pathname];
    const pushNavPaths = () => {
      navPaths.push(window.location.pathname);
    };

    navigationChange(pushNavPaths);

    return navPaths;
  }

  private static initScrollDepth() {
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
    return () => maxDepth;
  }
}

function sendPageMetric(extra: Record<string, any> = {}) {
  const nav = onNavigation();
  navigator.sendBeacon(
    "ENDPOINT",
    JSON.stringify({
      pageDuration: nav,
      scrollDepth: PageSpecific.getMaxScrollDepth(),
      ...extra,
    })
  );
}

function navigationChange(callback: () => void) {
  const originalPushState = history.pushState;
  history.pushState = function (...args) {
    originalPushState.apply(history, args);
    sendPageMetric();
    callback();
  };

  const originalReplaceState = history.replaceState;
  history.replaceState = function (...args) {
    originalReplaceState.apply(history, args);
    sendPageMetric();
    callback();
  };
}

function onNavigation() {
  const start = Number(localStorage.getItem(CURRENT_SESSION_START_TIME));
  const duration = Date.now() - start;
  localStorage.setItem(CURRENT_SESSION_START_TIME, Date.now().toString());
  return duration;
}
