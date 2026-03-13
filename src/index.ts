import { TrackClicks } from "./trackers/track_clicks";
// import { SessionManager } from "./trackers/session";
import { loadSpeed } from "./trackers/load_speed";
import { PageSpecific } from "./trackers/page_specific";

// Add screentime heatmap or analytics/statistics
loadSpeed();
// SessionManager.init();
PageSpecific.init();
TrackClicks.init();

/*
All the metrics are accuratly tracked, now I just need to send them to the server to agrigate data.
First focus on the side of the person creating a website. 
*/
