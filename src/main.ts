/* @refresh reload */
import createPlayerNameForm from "./playerNameForm";
import { attachEventBlocker } from "./preventFormSubmission";
import { render } from "solid-js/web";

Array.from(document.getElementsByTagName("form")).forEach(attachEventBlocker);

const root = document.getElementById("app");

render(createPlayerNameForm, root!);
