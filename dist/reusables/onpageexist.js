"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnSiteExit = OnSiteExit;
const isdevicemobile_1 = require("../reusables/isdevicemobile");
function OnSiteExit(getExtra) {
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
    navigator.sendBeacon("ENDPOINT", JSON.stringify({
        ...extra,
    }));
}
//# sourceMappingURL=onpageexist.js.map