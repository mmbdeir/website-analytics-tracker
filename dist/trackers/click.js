export function trackButtons() {
    document.addEventListener("click", (e) => {
        if (e.target.tagName.toLowerCase() === "button") {
            console.log("Button click!!");
        }
    });
}
//# sourceMappingURL=click.js.map