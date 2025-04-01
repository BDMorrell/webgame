/* @refresh reload */
import makeApplicationRoot from "./app";
// import { attachSubmitEventBlocker } from "./preventFormSubmission";

// Array.from(document.getElementsByTagName("form")).forEach(attachSubmitEventBlocker);

const root = document.getElementById("app");

makeApplicationRoot(root!);
