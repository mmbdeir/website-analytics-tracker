"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const click_1 = require("./trackers/click");
// import { SessionManager } from "./trackers/session";
const performance_1 = require("./trackers/performance");
const page_specific_1 = require("./trackers/page_specific");
// Add screentime heatmap or analytics/statistics
(0, performance_1.loadSpeed)();
// SessionManager.init();
page_specific_1.PageSpecific.init();
click_1.TrackClicks.init();
/*
All the metrics are accuratly tracked, now I just need to send them to the server to agrigate data.
First focus on the side of the person creating a website.
*/
//# sourceMappingURL=index.js.map