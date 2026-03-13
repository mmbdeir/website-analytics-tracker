"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOnSiteExit = SendOnSiteExit;
const siteID = document.querySelector("script[data-site-id]")
    ?.dataset.siteId;
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
    fetch(`https://mysite-component.onrender.com/updateMetrics/${siteID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(extra),
    });
}
//# sourceMappingURL=onpageexist.js.map