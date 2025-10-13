import { throttle } from "../reusables/throttle";
let time = 2000;
function newSession() {
    console.log("A new session");
}
function sessionManager() {
    let timeSinceLastUpdate = Date.now() - Number(localStorage.getItem("at-last-active") || 0);
    localStorage.setItem("at-last-active", Date.now().toString());
    if (timeSinceLastUpdate > time) {
        newSession();
    }
}
const updateActivity = throttle(() => {
    let timeSinceLastUpdate = Date.now() - Number(localStorage.getItem("at-last-active") || 0);
    console.log("Time since last update: " + timeSinceLastUpdate);
    localStorage.setItem("at-last-active", Date.now().toString());
    if (timeSinceLastUpdate > time) {
        newSession();
    }
}, 1500);
export function session() {
    sessionManager();
    window.onclick = updateActivity;
    window.onscroll = updateActivity;
    window.onkeydown = updateActivity;
    window.onmousemove = updateActivity;
    window.ontouchstart = updateActivity;
}
//# sourceMappingURL=session.js.map