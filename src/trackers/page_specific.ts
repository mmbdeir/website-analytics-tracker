import "scrollyfills";

const CURRENT_SESSION_START_TIME = "current_session_start_time";

export class PageSpecific {
  private static initilized = false;
  static init() {
    if (this.initilized) return;
    this.initilized = true;
    const navPaths = this.initNavPaths();
    const getMaxDepth = this.initScrollDepth();
    this.initVisibilityHandler(navPaths, getMaxDepth);
    this.timePerPage();
  }
  // Amount of sessions per page
  // - on page open(not reload) a new page session with the pages name from the metadata, and its url
  // From what page this user came from to get to this page
  private static initVisibilityHandler(
    navPaths: string[],
    getMaxScrollDepth: () => number
  ) {
    document.addEventListener("visibilitychange", (e) => {
      if (document.visibilityState === "hidden") {
        const start = Number(localStorage.getItem(CURRENT_SESSION_START_TIME));
        const duration = Date.now() - start;
        navigator.sendBeacon(
          "Use cloud run url to host the function, im using sendBeacon so it still runs if the tab closes",
          JSON.stringify({
            pageLeft: window.location.pathname,
          })
        );
        navigator.sendBeacon(
          "end point",
          JSON.stringify({ duration: duration })
        );
        navigator.sendBeacon(
          "endpoint",
          JSON.stringify({ navPaths: navPaths })
        );
        navigator.sendBeacon(
          "endpoint",
          JSON.stringify({ scrollDepth: getMaxScrollDepth() })
        );
      }
    });
  }

  private static timePerPage() {
    localStorage.setItem(CURRENT_SESSION_START_TIME, Date.now().toString());
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
    return () => maxDepth;
  }
}

function navigationChange(callback: () => void) {
  window.addEventListener("popstate", callback);

  const originalPushState = history.pushState;
  history.pushState = function (...args) {
    originalPushState.apply(history, args);
    callback();
  };

  const originalReplaceState = history.replaceState;
  history.replaceState = function (...args) {
    originalReplaceState.apply(history, args);
    callback();
  };
}
