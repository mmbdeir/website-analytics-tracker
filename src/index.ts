import { trackButtons } from "./trackers/click";
import { SessionManager } from "./trackers/session";
import { loadSpeed } from "./trackers/performance";
import { PageSpecific } from "./trackers/page_specific";

document.addEventListener("DOMContentLoaded", () => {
  trackButtons();
});

// Add screentime heatmap or analytics/statistics
loadSpeed();
SessionManager.sessionCounter();
// SessionManager.sessionTimer();
PageSpecific.init();
