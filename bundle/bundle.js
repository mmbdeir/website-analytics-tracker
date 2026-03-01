"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // dist/reusables/onpageexist.js
  var require_onpageexist = __commonJS({
    "dist/reusables/onpageexist.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SendOnSiteExit = SendOnSiteExit;
      var siteID = document.querySelector("script[data-site-id]")?.dataset.siteId;
      function SendOnSiteExit(getExtra) {
        const handler = () => {
          const extra = getExtra();
          sendPageMetric(extra);
          console.log("oou");
        };
        document.addEventListener("visibilitychange", (e) => {
          if (document.visibilityState === "hidden") {
            handler();
          }
        });
      }
      function sendPageMetric(extra = {}) {
        fetch(`https://analytics-backend-2h8r.onrender.com/updateMetrics/${siteID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(extra)
        });
        console.log(extra);
      }
    }
  });

  // dist/trackers/click.js
  var require_click = __commonJS({
    "dist/trackers/click.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TrackClicks = void 0;
      var onpageexist_1 = require_onpageexist();
      var TrackClicks = class {
        static init() {
          giveAttributes();
        }
      };
      exports.TrackClicks = TrackClicks;
      function getFingerprint(el) {
        const list = [];
        while (el && el.nodeType === 1) {
          let index = 1;
          let currentEl = el;
          while (currentEl.previousElementSibling) {
            currentEl = currentEl.previousElementSibling;
            index++;
          }
          if (el.tagName !== "HTML" && el.tagName !== "BODY") {
            list.unshift(`${el.tagName}:${index}`);
          }
          el = el.parentElement;
        }
        return list.join("/");
      }
      function hashString(string) {
        let hash = 0;
        for (const char of string) {
          hash = (hash << 5) - hash + char.charCodeAt(0);
          hash |= 0;
        }
        return `el_${hash}`;
      }
      var clickEvents = {};
      function giveAttributes() {
        document.addEventListener("click", (e) => {
          const target = e.target;
          if (!target)
            return;
          const page = window.location.pathname;
          clickEvents[page] ??= {};
          if (!target.getAttribute("tr_uuid")) {
            const print = getFingerprint(target);
            const id = hashString(print);
            target.setAttribute("tr_uuid", id);
          }
          let uuid = target.getAttribute("tr_uuid");
          clickEvents[page][uuid] ??= {
            count: 0,
            points: []
          };
          const rect = target.getBoundingClientRect();
          const x = Math.round(e.offsetX / rect.width * 100);
          const y = Math.round(e.offsetY / rect.height * 100);
          clickEvents[page][uuid].count += 1;
          clickEvents[page][uuid].points.push([x, y]);
          console.log(clickEvents);
        });
        (0, onpageexist_1.SendOnSiteExit)(() => ({
          clickEvents
        }));
      }
    }
  });

  // dist/trackers/performance.js
  var require_performance = __commonJS({
    "dist/trackers/performance.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.loadSpeed = loadSpeed;
      var onpageexist_1 = require_onpageexist();
      function loadSpeed() {
        window.addEventListener("DOMContentLoaded", () => {
          (0, onpageexist_1.SendOnSiteExit)(() => ({
            page: window.location.pathname,
            domLoadSpeed: performance.now().toFixed(1)
          }));
        });
      }
    }
  });

  // node_modules/scrollyfills/dist/scrollyfills.cjs
  var require_scrollyfills = __commonJS({
    "node_modules/scrollyfills/dist/scrollyfills.cjs"(exports) {
      function e(e2, t2) {
        (null == t2 || t2 > e2.length) && (t2 = e2.length);
        for (var n2 = 0, r2 = new Array(t2); n2 < t2; n2++) r2[n2] = e2[n2];
        return r2;
      }
      function t(t2, n2) {
        var r2 = "undefined" != typeof Symbol && t2[Symbol.iterator] || t2["@@iterator"];
        if (r2) return (r2 = r2.call(t2)).next.bind(r2);
        if (Array.isArray(t2) || (r2 = (function(t3, n3) {
          if (t3) {
            if ("string" == typeof t3) return e(t3, n3);
            var r3 = Object.prototype.toString.call(t3).slice(8, -1);
            return "Object" === r3 && t3.constructor && (r3 = t3.constructor.name), "Map" === r3 || "Set" === r3 ? Array.from(t3) : "Arguments" === r3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r3) ? e(t3, n3) : void 0;
          }
        })(t2)) || n2 && t2 && "number" == typeof t2.length) {
          r2 && (t2 = r2);
          var o2 = 0;
          return function() {
            return o2 >= t2.length ? { done: true } : { done: false, value: t2[o2++] };
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      if ("undefined" != typeof window && !("onscrollend" in window)) {
        n = function(e2, t2, n2) {
          var r2 = e2[t2];
          e2[t2] = function() {
            var e3 = Array.prototype.slice.apply(arguments, [0]);
            r2.apply(this, e3), e3.unshift(r2), n2.apply(this, e3);
          };
        }, r = function(e2, t2, n2, r2) {
          if ("scroll" == t2 || "scrollend" == t2) {
            var o2 = this, l = a.get(o2);
            if (void 0 === l) {
              var s = 0;
              l = { scrollListener: function(e3) {
                clearTimeout(s), s = setTimeout(function() {
                  i.size ? setTimeout(l.scrollListener, 100) : (o2 && o2.dispatchEvent(new Event("scrollend")), s = 0);
                }, 100);
              }, listeners: 0 }, e2.apply(o2, ["scroll", l.scrollListener, { passive: true }]), a.set(o2, l);
            }
            l.listeners++;
          }
        }, o = function(e2, t2, n2) {
          if ("scroll" == t2 || "scrollend" == t2) {
            var r2 = this, o2 = a.get(r2);
            void 0 !== o2 && (--o2.listeners > 0 || (e2.apply(r2, ["scroll", o2.scrollListener]), a.delete(r2)));
          }
        }, i = /* @__PURE__ */ new Set();
        document.addEventListener("touchstart", function(e2) {
          for (var n2, r2 = t(e2.changedTouches); !(n2 = r2()).done; ) i.add(n2.value.identifier);
        }, { passive: true }), document.addEventListener("touchend", function(e2) {
          for (var n2, r2 = t(e2.changedTouches); !(n2 = r2()).done; ) i.delete(n2.value.identifier);
        }, { passive: true }), document.addEventListener("touchcancel", function(e2) {
          for (var n2, r2 = t(e2.changedTouches); !(n2 = r2()).done; ) i.delete(n2.value.identifier);
        }, { passive: true });
        a = /* @__PURE__ */ new WeakMap();
        n(Element.prototype, "addEventListener", r), n(window, "addEventListener", r), n(document, "addEventListener", r), n(Element.prototype, "removeEventListener", o), n(window, "removeEventListener", o), n(document, "removeEventListener", o);
      }
      var n;
      var r;
      var o;
      var i;
      var a;
      exports.scrollend = { __proto__: null };
    }
  });

  // dist/trackers/page_specific.js
  var require_page_specific = __commonJS({
    "dist/trackers/page_specific.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PageSpecific = void 0;
      require_scrollyfills();
      var onpageexist_1 = require_onpageexist();
      var CURRENT_SESSION_START_TIME = "current_session_start_time";
      var siteID = document.querySelector("script[data-site-id]")?.dataset.siteId;
      var PageSpecific = class {
        static navPaths = [];
        static getMaxScrollDepth = () => 0;
        static init() {
          this.navPaths = [window.location.pathname];
          this.initNavPaths();
          this.getMaxScrollDepth = this.initScrollDepth();
          (0, onpageexist_1.SendOnSiteExit)(() => ({
            navPaths: this.navPaths,
            pageLeft: window.location.pathname
          }));
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
        static initNavPaths() {
          const pushNavPaths = () => {
            let currentPath = window.location.pathname;
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
          window.addEventListener("resize", () => {
            clientHeight = document.documentElement.clientHeight;
          });
          return () => Math.round(Math.min(100, maxDepth));
        }
      };
      exports.PageSpecific = PageSpecific;
      function sendPageMetric(extra = {}) {
        const duration = sessionDurationTimer();
        navigator.sendBeacon(`https://analytics-backend-2h8r.onrender.com/updateMetrics/${siteID}`, new Blob([
          JSON.stringify({
            page: window.location.pathname,
            pageDuration: duration,
            scrollDepth: PageSpecific.getMaxScrollDepth(),
            ...extra
          })
        ], { type: "application/json" }));
        console.log("maxDepth of previous: " + PageSpecific.getMaxScrollDepth());
      }
      function onNavigation(callback) {
        const originalPushState = history.pushState;
        history.pushState = function(...args) {
          originalPushState.apply(history, args);
          callback();
          sendPageMetric();
          PageSpecific.getMaxScrollDepth = PageSpecific.initScrollDepth();
        };
        const originalReplaceState = history.replaceState;
        history.replaceState = function(...args) {
          originalReplaceState.apply(history, args);
          callback();
          sendPageMetric();
          PageSpecific.getMaxScrollDepth = PageSpecific.initScrollDepth();
        };
      }
      function sessionDurationTimer() {
        const start = Number(localStorage.getItem(CURRENT_SESSION_START_TIME));
        const duration = Date.now() - start;
        localStorage.setItem(CURRENT_SESSION_START_TIME, Date.now().toString());
        console.log("Previous page duration: " + duration);
        return duration;
      }
    }
  });

  // dist/index.js
  var require_index = __commonJS({
    "dist/index.js"(exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
      var click_1 = require_click();
      var performance_1 = require_performance();
      var page_specific_1 = require_page_specific();
      (0, performance_1.loadSpeed)();
      page_specific_1.PageSpecific.init();
      click_1.TrackClicks.init();
    }
  });
  require_index();
})();
