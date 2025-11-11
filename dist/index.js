import { trackButtons } from "./trackers/click";
import { sessionManager } from "./trackers/session";
import { loadSpeed } from "./trackers/performance";
document.addEventListener("DOMContentLoaded", () => {
    trackButtons();
});
// Add screentime heatmap or analytics/statistics
loadSpeed();
sessionManager.sessionCounter();
sessionManager.sessionTimer();
//# sourceMappingURL=index.js.map