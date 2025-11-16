import { throttle } from "../reusables/throttle";
export class PageSpecific {
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
        history.pushState = function (...args) {
            originalPushState.apply(history, args);
            navPaths.push(location.pathname);
        };
        const originalReplaceState = history.replaceState;
        history.replaceState = function (...args) {
            originalReplaceState.apply(history, args);
            navPaths.push(location.pathname);
        };
        window.addEventListener("beforeunload", (e) => {
            e.preventDefault();
            navPaths.forEach((e, i) => {
                navigator.sendBeacon("Maybe not cloud run, if fire/supabase lets me use a url then do it", JSON.stringify({
                    page: e,
                    pageFrom: i > 0 ? navPaths[i - 1] : undefined,
                    pageTo: navPaths[i + 1],
                }));
            });
        });
    }
    static scrollDepth() {
        function getScrollDepthPercent() {
            const scroll = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            return (scroll / maxScroll) * 100;
        }
        let throttled = throttle(() => {
            const scrollDepth = getScrollDepthPercent();
            console.log(scrollDepth);
        }, 500);
        window.addEventListener("scroll", () => {
            throttled();
        });
        window.addEventListener("scrollend", () => {
            setTimeout(() => {
                throttled();
            }, 250);
        });
    }
}
//# sourceMappingURL=page_specific.js.map