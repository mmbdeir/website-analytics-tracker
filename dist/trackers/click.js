"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackButtons = trackButtons;
function trackButtons() {
    document.addEventListener("click", (e) => {
        if (e.target.tagName.toLowerCase() === "button") {
            console.log("Button click!!");
        }
    });
}
//# sourceMappingURL=click.js.map