import { isDeviceMobile } from "../reusables/isdevicemobile";

const siteID = document.querySelector<HTMLScriptElement>("script[data-site-id]")
  ?.dataset.siteId;

export function SendOnSiteExit(getExtra: () => Record<string, any>) {
  const handler = () => {
    const extra = getExtra();
    sendPageMetric(extra);
    console.log("oou");
  };
  document.addEventListener("visibilitychange", (e) => {
    if (document.visibilityState === "hidden") {
      handler();
    }
  });
}

function sendPageMetric(extra: Record<string, any> = {}) {
  fetch(`https://mysite-component.onrender.com/updateMetrics/${siteID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(extra),
  });
}
