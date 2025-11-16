import { throttle } from "../reusables/throttle";
// let time = 2000;
let time = 60 * 60 * 1000;
function newSession() {
  console.log(
    "prev sess time:" +
      (Date.now() - Number(localStorage.getItem("session-start-time")))
  );
  localStorage.removeItem("session-start-time");
  localStorage.setItem("session-start-time", Date.now().toString());
}

export class SessionManager {
  static sessionCounter() {
    checkForNewSession();
    window.onclick = updateActivity;
    window.onscroll = updateActivity;
    window.onkeydown = updateActivity;
    window.onmousemove = updateActivity;
    window.ontouchstart = updateActivity;
  }
  static sessionTimer() {
    let sessionStartTime = localStorage.getItem("session-start-time");
    if (!sessionStartTime) {
      localStorage.setItem("session-start-time", Date.now().toString());
    }
  }
}

function checkForNewSession() {
  let timeSinceLastUpdate =
    Date.now() - Number(localStorage.getItem("at-last-active") || 0);
  localStorage.setItem("at-last-active", Date.now().toString());
  if (timeSinceLastUpdate > time) {
    newSession();
  }
}

const updateActivity = throttle(() => {
  checkForNewSession();
}, 1500);
