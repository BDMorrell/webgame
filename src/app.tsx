import { render } from "solid-js/web";
import createPlayerNameForm from "./playerNameForm";
import makePaneDomain from "./pane";

export default function makeApplicationRoot(element: HTMLElement) {
    let onPointerDown = makePaneDomain(element);
    render(() => (<div class="pane" on:pointerdown={onPointerDown}>{createPlayerNameForm()}</div>), element);
}
