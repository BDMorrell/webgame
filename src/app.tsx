import { render } from "solid-js/web";
import createPlayerNameForm from "./playerNameForm";
import makePaneDomain, { paneClass } from "./pane";

export default function makeApplicationRoot(element: HTMLElement) {
    const onPointerDown = makePaneDomain(element);
    render(() => (<div class={paneClass} on:pointerdown={onPointerDown}>{createPlayerNameForm()}</div>), element);
}
