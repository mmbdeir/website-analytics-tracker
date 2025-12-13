import { isDeviceMobile } from "../reusables/isdevicemobile";

export function OnPageExit() {
  if (isDeviceMobile()) {
    document.addEventListener("visibilitychange", (e) => {
      if (document.visibilityState === "hidden") {
        sendPageMetric({});
        console.log("Page Left: " + window.localStorage.pathname);
      }
    });
  } else {
    document.addEventListener("beforeunload", (e) => {
      sendPageMetric({});
      console.log("Page Left: " + window.localStorage.pathname);
    });
  }
}

function sendPageMetric(extra: Record<string, any> = {}) {
  navigator.sendBeacon(
    "ENDPOINT",
    JSON.stringify({
      ...extra,
    })
  );
}
