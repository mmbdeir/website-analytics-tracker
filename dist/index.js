"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const click_1 = require("./trackers/click");
const session_1 = require("./trackers/session");
const performance_1 = require("./trackers/performance");
const page_specific_1 = require("./trackers/page_specific");
document.addEventListener("DOMContentLoaded", () => {
    (0, click_1.trackButtons)();
});
// Add screentime heatmap or analytics/statistics
(0, performance_1.loadSpeed)();
session_1.SessionManager.init();
page_specific_1.PageSpecific.init();
// SessionManager.sessionTimer();
//# sourceMappingURL=index.js.map