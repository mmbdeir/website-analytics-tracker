import { SendOnSiteExit } from "../reusables/onpageexist";

export class TrackClicks {
  static init() {
    giveAttributes();
  }
}

function getFingerprint(el: Element): string {
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
    el = el.parentElement!;
  }
  return list.join("/");
}

function hashString(string: string) {
  let hash = 0;
  for (const char of string) {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    hash |= 0;
  }
  return `el_${hash}`;
}

type ClickPoint = Record<
  string,
  Record<
    string,
    {
      count: number;
      points: [number, number][];
    }
  >
>;
const clickEvents: ClickPoint = {};

function giveAttributes() {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    const page = window.location.pathname;
    clickEvents[page] ??= {};

    if (!target.getAttribute("tr_uuid")) {
      const print = getFingerprint(target);
      const id = hashString(print);
      target.setAttribute("tr_uuid", id);
    }

    let uuid: string = target.getAttribute("tr_uuid")!;

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
  SendOnSiteExit(() => ({
    clickEvents: clickEvents,
  }));
}
