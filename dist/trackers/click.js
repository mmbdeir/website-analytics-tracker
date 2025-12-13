"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackClicks = void 0;
class TrackClicks {
    static init() {
        giveAttributes();
    }
}
exports.TrackClicks = TrackClicks;
function getFingerprint(el) {
    const list = [];
    while (el && el.nodeType === 1) {
        let index = 1;
        let currentEl = el;
        while (currentEl.previousElementSibling) {
            currentEl = currentEl.previousElementSibling;
            index++;
        }
        if (el.tagName !== "HTML" && el.tagName !== "BODY") {
            list.unshift(`${el.tagName}:${index}`);
        }
        el = el.parentElement;
    }
    return list.join("/");
}
function hashString(string) {
    let hash = 0;
    for (const char of string) {
        hash = (hash << 5) - hash + char.charCodeAt(0);
        hash |= 0;
    }
    return `el_${hash}`;
}
const clickEvents = {};
function giveAttributes() {
    document.addEventListener("click", (e) => {
        const target = e.target;
        if (!target)
            return;
        if (!target.getAttribute("tr_uuid")) {
            const print = getFingerprint(target);
            const id = hashString(print);
            target.setAttribute("tr_uuid", id);
        }
        let uuid = target.getAttribute("tr_uuid");
        if (!clickEvents[uuid]) {
            clickEvents[uuid] = {
                count: 0,
                points: [],
            };
        }
        clickEvents[uuid].count += 1;
        clickEvents[uuid].points.push([1, 1]);
        /* on close of website
          send data to server
        */
    });
}
//                               name       count
//On a click, it increases the {"el_123": 4}.
//When viewing the heatmap, run the html and calculate all the elements hashedpath and if it exists in the datastructure, change percentage gradient for color.
//When sending, dont send on everyclick, instead store it and use a sendBeacon() to send click count when user closes the site.
//# sourceMappingURL=click.js.map