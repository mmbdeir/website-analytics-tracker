"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackClicks = void 0;
class TrackClicks {
    static init() {
        document.addEventListener("click", (el) => {
            getFingerprint(el.target);
        });
    }
}
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
        if (el.tagName != "HTML" && el.tagName != "BODY") {
            list.unshift(`${el.tagName}:${index}`);
        }
        el = el.parentElement;
    }
    return list.join("/");
}
//# sourceMappingURL=click.js.map