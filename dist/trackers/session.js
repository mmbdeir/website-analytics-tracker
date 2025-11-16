import { throttle } from "../reusables/throttle";
// let time = 2000;
let time = 60 * 60 * 1000;
function newSession() {
    localStorage.setItem("session-start-time", Date.now().toString());
}
export class SessionManager {
    static sessionCounter() {
        checkForNewSession();
        window.addEventListener("click", updateActivity);
        window.addEventListener("scroll", updateActivity);
        window.addEventListener("keydown", updateActivity);
        window.addEventListener("mousemove", updateActivity);
        window.addEventListener("touchstart", updateActivity);
    }
}
function checkForNewSession() {
    let timeSinceLastUpdate = Date.now() - Number(localStorage.getItem("at-last-active") || 0);
    localStorage.setItem("at-last-active", Date.now().toString());
    if (timeSinceLastUpdate > time) {
        newSession();
    }
}
const updateActivity = throttle(() => {
    checkForNewSession();
}, 1500);
//# sourceMappingURL=session.js.map