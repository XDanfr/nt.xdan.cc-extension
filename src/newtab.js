// Show a short message if the page never loads (for example when offline).
const frame = document.querySelector("iframe");
const message = document.querySelector(".offline");
let loaded = false;
frame.addEventListener("load", () => { loaded = true; message.hidden = true; });
setTimeout(() => { if (!loaded && !navigator.onLine) message.hidden = false; }, 4000);
window.addEventListener("online", () => { if (!loaded) frame.src = frame.src; });
