import digitalFontUrl from "./fonts/djbgetdigital.woff2?url";

const STYLE_ID = "ploc-cellar-numeric-typography";

if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    @font-face {
      font-family: "DJB Get Digital";
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url("${digitalFontUrl}") format("woff2");
    }

    :root {
      --ploc-numeric-font-family: "DJB Get Digital", monospace;
    }
  `;
  document.head.append(style);
}
