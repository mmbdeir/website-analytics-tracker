import { isDeviceMobile } from "../reusables/isdevicemobile";

export function OnPageExit(getExtra: () => Record<string, any>) {
  const handler = () => {
    const extra = getExtra();
    sendPageMetric(extra);
    console.log("Page Left: " + window.location.pathname);
  };
  if (isDeviceMobile()) {
    document.addEventListener("visibilitychange", (e) => {
      if (document.visibilityState === "hidden") {
        console.log("Page Left: " + window.location.pathname);
        handler();
      }
    });
  } else {
    document.addEventListener("beforeunload", (e) => {
      handler();
      console.log("Page Left: " + window.location.pathname);
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
