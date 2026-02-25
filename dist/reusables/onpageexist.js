"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOnSiteExit = SendOnSiteExit;
const isdevicemobile_1 = require("../reusables/isdevicemobile");
const siteID = document.querySelector("script[data-site-id]")
    ?.dataset.siteId;
function SendOnSiteExit(getExtra) {
    const handler = () => {
        const extra = getExtra();
        sendPageMetric(extra);
    };
    if ((0, isdevicemobile_1.isDeviceMobile)()) {
        document.addEventListener("visibilitychange", (e) => {
            if (document.visibilityState === "hidden") {
                handler();
            }
        });
    }
    else {
        document.addEventListener("beforeunload", (e) => {
            handler();
        });
    }
}
function sendPageMetric(extra = {}) {
    navigator.sendBeacon(`https://analytics-backend-2h8r.onrender.com/updateMetrics/${siteID}`, new Blob([
        JSON.stringify({
            ...extra,
        }),
    ], { type: "application/json" }));
}
//# sourceMappingURL=onpageexist.js.map