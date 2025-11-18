import { throttle } from "../reusables/throttle";
// let time = 2000;
let time = 60 * 60 * 1000;
function newSession() {
  try {
    localStorage.setItem("session-start-time", Date.now().toString());
  } catch (e) {
    console.log("Local storage doesnt work cuz: " + e);
  }
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
  // static sessionTimer() {
  //   let sessionStartTime = localStorage.getItem("session-start-time");
  //   if (!sessionStartTime) {
  //     localStorage.setItem("session-start-time", Date.now().toString());
  //   }
  // }
}

function checkForNewSession() {
  try {
    let timeSinceLastUpdate =
      Date.now() - Number(localStorage.getItem("at-last-active") || 0);
    localStorage.setItem("at-last-active", Date.now().toString());
    if (timeSinceLastUpdate > time) {
      newSession();
    }
  } catch (e) {
    console.log("Local storage doesnt work cuz: " + e);
  }
}

const updateActivity = throttle(() => {
  checkForNewSession();
}, 1500);
