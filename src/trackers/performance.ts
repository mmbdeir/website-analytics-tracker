export function loadSpeed() {
  window.addEventListener("DOMContentLoaded", () => {
    console.log(`Loaded Speed: ${performance.now().toFixed(1)} ms`);
  });
}
