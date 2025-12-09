"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDeviceMobile = isDeviceMobile;
function isDeviceMobile() {
    return (navigator.userAgent.includes("Mobile") ||
        navigator.userAgent.includes("Android") ||
        navigator.userAgent.includes("iPhone"));
}
//# sourceMappingURL=isdevicemobile.js.map