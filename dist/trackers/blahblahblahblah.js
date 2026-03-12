"use strict";
// import { throttle } from "../reusables/throttle";
Object.defineProperty(exports, "__esModule", { value: true });
// const SESSION_TIMEOUT_MS = 3 * 60 * 1000;
// const LAST_ACTIVE_KEY = "at-last-active";
// function newSession() {
//   try {
//     // navigator.sendBeacon()
//     console.log("")
//   } catch (error) {
//     console.log("Local storage doesnt work cuz: " + error);
//   }
// }
// export class SessionManager {
//   private static initilized = false;
//   static init() {
//     if (this.initilized) return;
//     this.initilized = true;
//     checkForNewSession();
//     checkForActivity();
//   }
// }
// function checkForActivity() {
//   window.addEventListener("click", updateActivity);
//   window.addEventListener("scroll", updateActivity);
//   window.addEventListener("keydown", updateActivity);
//   window.addEventListener("mousemove", updateActivity);
//   window.addEventListener("touchstart", updateActivity);
// }
// function checkForNewSession() {
//   try {
//     let timeSinceLastUpdate =
//       Date.now() - Number(localStorage.getItem(LAST_ACTIVE_KEY) || 0);
//     localStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString());
//     if (timeSinceLastUpdate > SESSION_TIMEOUT_MS) {
//       newSession();
//     }
//   } catch (e) {
//     console.log("Local storage doesnt work cuz: " + e);
//   }
// }
// const updateActivity = throttle(() => {
//   checkForNewSession();
// }, 1500);
//# sourceMappingURL=blahblahblahblah.js.map