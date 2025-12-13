"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnPageExit = OnPageExit;
const isdevicemobile_1 = require("../reusables/isdevicemobile");
function OnPageExit() {
    if ((0, isdevicemobile_1.isDeviceMobile)()) {
        document.addEventListener("visibilitychange", (e) => {
            if (document.visibilityState === "hidden") {
                sendPageMetric({});
                console.log("Page Left: " + window.localStorage.pathname);
            }
        });
    }
    else {
        document.addEventListener("beforeunload", (e) => {
            sendPageMetric({});
            console.log("Page Left: " + window.localStorage.pathname);
        });
    }
}
function sendPageMetric(extra = {}) {
    navigator.sendBeacon("ENDPOINT", JSON.stringify({
        ...extra,
    }));
}
//# sourceMappingURL=onpageexist.js.map