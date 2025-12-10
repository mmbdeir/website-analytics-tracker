"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const click_1 = require("./trackers/click");
const session_1 = require("./trackers/session");
const performance_1 = require("./trackers/performance");
const page_specific_1 = require("./trackers/page_specific");
// Add screentime heatmap or analytics/statistics
(0, performance_1.loadSpeed)();
session_1.SessionManager.init();
page_specific_1.PageSpecific.init();
click_1.TrackClicks.init();
//# sourceMappingURL=index.js.map