"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSpeed = loadSpeed;
function loadSpeed() {
    window.addEventListener("DOMContentLoaded", () => {
        navigator.sendBeacon("ENDPOINT", JSON.stringify({
            page: window.location.pathname,
            domLoadSpeed: performance.now().toFixed(1),
        }));
    });
}
//# sourceMappingURL=performance.js.map