"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionManager = void 0;
const throttle_1 = require("../reusables/throttle");
const SESSION_TIMEOUT_MS = 3 * 60 * 1000;
const LAST_ACTIVE_KEY = "at-last-active";
function newSession() {
    try {
        // navigator.sendBeacon()
    }
    catch (error) {
        console.log("Local storage doesnt work cuz: " + error);
    }
}
class SessionManager {
    static initilized = false;
    static init() {
        if (this.initilized)
            return;
        this.initilized = true;
        checkForNewSession();
        checkForActivity();
    }
}
exports.SessionManager = SessionManager;
function checkForActivity() {
    window.addEventListener("click", updateActivity);
    window.addEventListener("scroll", updateActivity);
    window.addEventListener("keydown", updateActivity);
    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("touchstart", updateActivity);
}
function checkForNewSession() {
    try {
        let timeSinceLastUpdate = Date.now() - Number(localStorage.getItem(LAST_ACTIVE_KEY) || 0);
        localStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString());
        if (timeSinceLastUpdate > SESSION_TIMEOUT_MS) {
            newSession();
        }
    }
    catch (e) {
        console.log("Local storage doesnt work cuz: " + e);
    }
}
const updateActivity = (0, throttle_1.throttle)(() => {
    checkForNewSession();
}, 1500);
//# sourceMappingURL=session.js.map