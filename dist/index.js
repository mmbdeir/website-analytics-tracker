import { trackButtons } from "./trackers/click";
import { sessionManager } from "./trackers/session";
import { performanceDomLoadSpeed } from "./trackers/performance";
document.addEventListener("DOMContentLoaded", () => {
    trackButtons();
});
performanceDomLoadSpeed();
sessionManager.sessionCounter();
//# sourceMappingURL=index.js.map