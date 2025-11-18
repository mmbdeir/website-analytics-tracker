import "scrollyfills";

export class PageSpecific {
  static init() {
    this.initNavPaths();
    this.initScrollDepth();
    this.initPageLeft();
  }
  // Amount of sessions per page
  // - on page open(not reload) a new page session with the pages name from the metadata, and its url
  // From what page this user came from to get to this page
  static initPageLeft(): void {
    document.addEventListener("beforeunload", (e) => {
      navigator.sendBeacon(
        "Use cloud run url to host the function, im using sendBeacon so it still runs if the tab closes",
        JSON.stringify({
          pageLeft: window.location.pathname,
          // duration: get session duration
        })
      );
    });
  }
  // Track what page the user came from and where did he go after

  private static initNavPaths(): void {
    const navPaths = [location.pathname];
    const pushNavPaths = () => {
      navPaths.push(location.pathname);
    };

    window.addEventListener("popstate", pushNavPaths);

    const originalPushState = history.pushState;
    history.pushState = function (...args) {
      originalPushState.apply(history, args);
      pushNavPaths();
    };

    const originalReplaceState = history.replaceState;
    history.replaceState = function (...args) {
      originalReplaceState.apply(history, args);
      pushNavPaths();
    };

    window.addEventListener("beforeunload", (e) => {
      navPaths.forEach((e, i) => {
        navigator.sendBeacon(
          "Maybe not cloud run, if fire/supabase lets me use a url then do it",
          JSON.stringify({
            page: e,
            pageFrom: i > 0 ? navPaths[i - 1] : undefined,
            pageTo: navPaths[i + 1],
          })
        );
      });
    });
  }

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
    window.addEventListener("beforeunload", () => {
      navigator.sendBeacon(
        "Use some url to host the function",
        JSON.stringify({ scrollDepth: maxDepth })
      );
    });
  }
}
