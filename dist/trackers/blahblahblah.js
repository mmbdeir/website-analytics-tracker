"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSpeed = loadSpeed;
const onpageexist_1 = require("../reusables/onpageexist");
function loadSpeed() {
    window.addEventListener("DOMContentLoaded", () => {
        (0, onpageexist_1.SendOnSiteExit)(() => ({
            page: window.location.pathname,
            domLoadSpeed: performance.now().toFixed(1),
        }));
    });
}
//# sourceMappingURL=blahblahblah.js.map