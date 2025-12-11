export class TrackClicks {
  static init() {
    document.addEventListener("click", (el) => {
      const hashedString = hashString(getFingerprint(el.target as HTMLElement));
      // send the hashed string
    });
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
