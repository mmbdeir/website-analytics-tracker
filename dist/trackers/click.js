"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackClicks = void 0;
const onpageexist_1 = require("../reusables/onpageexist");
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
        const page = window.location.pathname;
        clickEvents[page] ??= {};
        if (!target.getAttribute("tr_uuid")) {
            const print = getFingerprint(target);
            const id = hashString(print);
            target.setAttribute("tr_uuid", id);
        }
        let uuid = target.getAttribute("tr_uuid");
        clickEvents[page][uuid] ??= {
            count: 0,
            points: [],
        };
        const rect = target.getBoundingClientRect();
        const x = Math.round((e.offsetX / rect.width) * 100);
        const y = Math.round((e.offsetY / rect.height) * 100);
        clickEvents[page][uuid].count += 1;
        clickEvents[page][uuid].points.push([x, y]);
        console.log(clickEvents);
    });
    (0, onpageexist_1.OnSiteExit)(() => ({
        clickEvents: clickEvents,
    }));
}
//                               name       count
//When viewing the heatmap, run the html and calculate all the elements hashedpath and if it exists in the datastructure, change percentage gradient for color.
//When sending, dont send on everyclick, instead store it and use a sendBeacon() to send click count when user closes the site.
//# sourceMappingURL=click.js.map