"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = throttle;
function throttle(fn, delay) {
    let isThr = true;
    return function () {
        if (isThr) {
            fn();
            isThr = false;
            setTimeout(() => (isThr = true), delay);
        }
    };
}
//# sourceMappingURL=throttle.js.map