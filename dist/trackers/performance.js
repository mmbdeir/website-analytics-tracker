"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSpeed = loadSpeed;
function loadSpeed() {
    window.addEventListener("DOMContentLoaded", () => {
        console.log(`Loaded Speed: ${performance.now().toFixed(1)} ms`);
    });
}
//# sourceMappingURL=performance.js.map