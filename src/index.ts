import { TrackClicks } from "./trackers/click";
import { SessionManager } from "./trackers/session";
import { loadSpeed } from "./trackers/performance";
import { PageSpecific } from "./trackers/page_specific";

// Add screentime heatmap or analytics/statistics
loadSpeed();
SessionManager.init();
PageSpecific.init();
TrackClicks.init();
