import { isDeviceMobile } from "../reusables/isdevicemobile";

export function OnSiteExit(getExtra: () => Record<string, any>) {
  const handler = () => {
    const extra = getExtra();
    sendPageMetric(extra);
  };
  if (isDeviceMobile()) {
    document.addEventListener("visibilitychange", (e) => {
      if (document.visibilityState === "hidden") {
        handler();
      }
    });
  } else {
    document.addEventListener("beforeunload", (e) => {
      handler();
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
