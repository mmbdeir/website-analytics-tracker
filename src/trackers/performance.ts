export function loadSpeed() {
  window.addEventListener("DOMContentLoaded", () => {
    navigator.sendBeacon(
      "ENDPOINT",
      JSON.stringify({
        page: window.location.pathname,
        domLoadSpeed: performance.now().toFixed(1),
      })
    );
  });
}
