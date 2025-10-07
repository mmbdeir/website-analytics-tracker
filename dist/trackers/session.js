let timer;
let time = 3 * 1000;
function endSession() {
    console.log("Session is done due to inactivity");
}
function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(endSession, time);
}
export function session() {
    window.onscroll = resetTimer;
    window.onclick = resetTimer;
    window.onmousemove = resetTimer;
    window.onload = resetTimer;
    window.onkeydown = resetTimer;
    window.ontouchstart = resetTimer;
}
//# sourceMappingURL=session.js.map