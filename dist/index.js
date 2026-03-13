"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const track_clicks_1 = require("./trackers/track_clicks");
// import { SessionManager } from "./trackers/session";
const load_speed_1 = require("./trackers/load_speed");
const page_specific_1 = require("./trackers/page_specific");
// Add screentime heatmap or analytics/statistics
(0, load_speed_1.loadSpeed)();
// SessionManager.init();
page_specific_1.PageSpecific.init();
track_clicks_1.TrackClicks.init();
/*
All the metrics are accuratly tracked, now I just need to send them to the server to agrigate data.
First focus on the side of the person creating a website.
*/
//# sourceMappingURL=index.js.map