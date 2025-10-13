export function throttle(fn, delay) {
    let isThr = true;
    return function () {
        if (isThr) {
            fn();
            isThr = false;
            setTimeout(() => (isThr = true), delay);
        }
    };
}
//# sourceMappingURL=tracker.js.map