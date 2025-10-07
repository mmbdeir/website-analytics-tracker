import { trackButtons } from "./trackers/click";
import { session } from "./trackers/session";
import { performanceDomLoadSpeed } from "./trackers/performance";

document.addEventListener("DOMContentLoaded", () => {
  trackButtons();
});
performanceDomLoadSpeed();
session();
