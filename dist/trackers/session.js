import { throttle } from "../reusables/throttle";
// let time = 2000;
let time = 60 * 30 * 1000;
function newSession() {
    console.log("A new session");
}
export class sessionManager {
    static sessionCounter() {
        checkForNewSession();
        window.onclick = updateActivity;
        window.onscroll = updateActivity;
        window.onkeydown = updateActivity;
        window.onmousemove = updateActivity;
        window.ontouchstart = updateActivity;
    }
}
function checkForNewSession() {
    let timeSinceLastUpdate = Date.now() - Number(localStorage.getItem("at-last-active") || 0);
    console.log("Time since last update: " + timeSinceLastUpdate);
    localStorage.setItem("at-last-active", Date.now().toString());
    if (timeSinceLastUpdate > time) {
        newSession();
    }
}
const updateActivity = throttle(() => {
    checkForNewSession();
}, 1500);
//# sourceMappingURL=session.js.map