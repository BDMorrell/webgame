/* @refresh reload */
import makeApplicationRoot from "./app";

import polyfill from "./polyfill";
// import { attachSubmitEventBlocker } from "./preventFormSubmission";

// Array.from(document.getElementsByTagName("form")).forEach(attachSubmitEventBlocker);

polyfill();

const root = document.getElementById("app");

makeApplicationRoot(root!);
