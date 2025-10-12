import { throttle } from "../reusables/throttle";

let timer: NodeJS.Timeout;

let time = 1000;

function newSession() {
  console.log("A new session");
}

function sessionManager() {
  let ts = Date.now() - Number(localStorage.getItem("at-sess-timestamp"));
  localStorage.setItem("at-sess-timestamp", Date.now().toString());
  if (ts > time) {
    newSession();
  } else {
    console.log("hiiiiiii");
  }
}

let resettimestamp = throttle(function () {
  localStorage.setItem("at-sess-timestamp", Date.now().toString());
  console.log("Hiiiii");
}, 3000);

export function session() {
  sessionManager();
  window.onclick = resettimestamp;
  window.onscroll = resettimestamp;
  window.onkeydown = resettimestamp;
  window.onmousemove = resettimestamp;
  window.onload = resettimestamp;
  window.ontouchstart = resettimestamp;
}
