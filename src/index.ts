import { TrackClicks } from "./trackers/blahblah";
// import { SessionManager } from "./trackers/session";
import { loadSpeed } from "./trackers/blahblahblah";
import { PageSpecific } from "./trackers/blah";

// Add screentime heatmap or analytics/statistics
loadSpeed();
// SessionManager.init();
PageSpecific.init();
TrackClicks.init();

/*
All the metrics are accuratly tracked, now I just need to send them to the server to agrigate data.
First focus on the side of the person creating a website. 
*/
