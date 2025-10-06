export function trackButtons() {
  document.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).tagName.toLowerCase() === "button") {
      console.log("Button click!!");
    }
  });
}
