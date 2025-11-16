export class PageSpecific {
  // Amount of sessions per page
  // - on page open(not reload) a new page session with the pages name from the metadata, and its url
  // From what page this user came from to get to this page
  static pageLeft() {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      navigator.sendBeacon(
        "Use cloud run url to host the function, im using sendBeacon so it still runs if the tab closes",
        JSON.stringify({ pageLeft: window.location.pathname })
      );
    });
  }
  static visitsPerPage() {
    // Use the history api
  }
}
