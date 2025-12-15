"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnPageExit = OnPageExit;
const isdevicemobile_1 = require("../reusables/isdevicemobile");
function OnPageExit(getExtra) {
    const handler = () => {
        const extra = getExtra();
        sendPageMetric(extra);
        console.log("Page Left: " + window.location.pathname);
    };
    if ((0, isdevicemobile_1.isDeviceMobile)()) {
        document.addEventListener("visibilitychange", (e) => {
            if (document.visibilityState === "hidden") {
                console.log("Page Left: " + window.location.pathname);
                handler();
            }
        });
    }
    else {
        document.addEventListener("beforeunload", (e) => {
            handler();
            console.log("Page Left: " + window.location.pathname);
        });
    }
}
function sendPageMetric(extra = {}) {
    navigator.sendBeacon("ENDPOINT", JSON.stringify({
        ...extra,
    }));
}
//# sourceMappingURL=onpageexist.js.map