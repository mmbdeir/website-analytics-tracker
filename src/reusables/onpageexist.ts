import { isDeviceMobile } from "../reusables/isdevicemobile";

const siteID = document.querySelector<HTMLScriptElement>("script[data-site-id]")
  ?.dataset.siteId;

export function SendOnSiteExit(getExtra: () => Record<string, any>) {
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
    `https://analytics-backend-2h8r.onrender.com/updateMetrics/${siteID}`,
    new Blob(
      [
        JSON.stringify({
          ...extra,
        }),
      ],
      { type: "application/json" }
    )
  );
}
