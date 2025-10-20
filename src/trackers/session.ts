import { throttle } from "../reusables/throttle";
let time = 2000;
// let time = 60 * 30 * 1000;
function newSession() {
  console.log("A new session");
  console.log(
    "session start" +
      (Date.now() - Number(localStorage.getItem("session-start-time"))) / 1000
  );
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
  // This should be to get total time, but there should be a new class to get time per page in maybe session manager
  static time = Date.now();
  static sessionTimer() {
    let sessionStartTime = localStorage.getItem("session-start-time");
    if (!sessionStartTime) {
      localStorage.setItem("session-start-time", Date.now().toString());
    }
    window.onabort = () => {
      localStorage.removeItem("session-start-time");
    };
  }
}

function checkForNewSession() {
  let timeSinceLastUpdate =
    Date.now() - Number(localStorage.getItem("at-last-active") || 0);
  console.log("Time since last update: " + timeSinceLastUpdate);
  localStorage.setItem("at-last-active", Date.now().toString());
  if (timeSinceLastUpdate > time) {
    newSession();
  }
}

const updateActivity = throttle(() => {
  checkForNewSession();
}, 1500);
