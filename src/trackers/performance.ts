export function performanceDomLoadSpeed() {
  window.addEventListener("load", () => {
    const navEntries = performance.getEntriesByType("navigation")[0];
    const perfEntry = navEntries as PerformanceNavigationTiming;

    const domContentLoadedTime = (
      perfEntry.domContentLoadedEventEnd - perfEntry.startTime
    ).toFixed(2);

    console.log(`DOM Content Loaded: ${domContentLoadedTime} ms`);
  });
}
