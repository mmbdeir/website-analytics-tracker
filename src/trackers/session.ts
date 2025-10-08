import { throttle } from "../reusables/throttle";

let timer: NodeJS.Timeout;

let time = 1000 * 60 * 30;

function sessionPrint() {
  console.log("A new session");
}

function og() {
  let ts = Date.now() - Number(localStorage.getItem("at-sess-timestamp"));
  if (ts > time) {
    localStorage.setItem("at-sess-timestamp", Date.now().toString());
    sessionPrint();
    console.log("hi");
  } else {
    localStorage.setItem("at-sess-timestamp", Date.now().toString());
    console.log("hiiiiiiiiii");
  }
}

let cs = throttle(function () {
  localStorage.setItem("at-sess-timestamp", Date.now().toString());
}, 3000);

function resetTimer() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(sessionPrint, time);
  cs();
}

export function session() {
  og();
  window.onclick = resetTimer;
  window.onscroll = resetTimer;
  window.onkeydown = resetTimer;
  window.onmousemove = resetTimer;
  window.onload = resetTimer;
  window.ontouchstart = resetTimer;
}
