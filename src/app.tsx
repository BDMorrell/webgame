import { render } from "solid-js/web";
import createPlayerNameForm from "./playerNameForm";
import makePaneDomain, { paneClasses } from "./pane";

export default function makeApplicationRoot(element: HTMLElement) {
    const onPointerDown = makePaneDomain(element);
    render(() => (<div class={paneClasses.pane} on:pointerdown={onPointerDown}>{createPlayerNameForm()}</div>), element);
}
