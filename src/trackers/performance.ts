import { SendOnSiteExit } from "../reusables/onpageexist";

export function loadSpeed() {
  window.addEventListener("DOMContentLoaded", () => {
    SendOnSiteExit(() => ({
      page: window.location.pathname,
      domLoadSpeed: performance.now().toFixed(1),
    }));
  });
}
