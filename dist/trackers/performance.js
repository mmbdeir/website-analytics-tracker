export function loadSpeed() {
    window.addEventListener("DOMContentLoaded", () => {
        // const navEntries = performance.getEntriesByType("navigation")[0];
        // const perfEntry = navEntries as PerformanceNavigationTiming;
        // const domContentLoadedTime = (
        //   perfEntry.domContentLoadedEventEnd - perfEntry.startTime
        // ).toFixed(2);
        // console.log(`DOM Content Loaded: ${domContentLoadedTime} ms`);
        console.log(`Loaded Speed: ${performance.now().toFixed(1)} ms`);
    });
}
//# sourceMappingURL=performance.js.map