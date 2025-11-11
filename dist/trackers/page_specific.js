export class PageSpecific {
    // Amount of sessions per page
    // - on page open(not reload) a new page session with the pages name from the metadata, and its url
    // From what page this user came from to get to this page
    static pageSessionsTracker() {
        window.onload = () => {
            const nav = performance.getEntriesByType("navigation")[0];
        };
    }
}
//# sourceMappingURL=page_specific.js.map