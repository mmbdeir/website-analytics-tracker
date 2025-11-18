"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionManager = void 0;
const throttle_1 = require("../reusables/throttle");
// let time = 2000;
let time = 60 * 60 * 1000;
function newSession() {
    try {
        localStorage.setItem("session-start-time", Date.now().toString());
    }
    catch (e) {
        console.log("Local storage doesnt work cuz: " + e);
    }
}
class SessionManager {
    static sessionCounter() {
        checkForNewSession();
        window.addEventListener("click", updateActivity);
        window.addEventListener("scroll", updateActivity);
        window.addEventListener("keydown", updateActivity);
        window.addEventListener("mousemove", updateActivity);
        window.addEventListener("touchstart", updateActivity);
    }
}
exports.SessionManager = SessionManager;
function checkForNewSession() {
    try {
        let timeSinceLastUpdate = Date.now() - Number(localStorage.getItem("at-last-active") || 0);
        localStorage.setItem("at-last-active", Date.now().toString());
        if (timeSinceLastUpdate > time) {
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