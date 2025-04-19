import { render } from "solid-js/web";
import createPlayerNameForm from "./playerNameForm";
import makePaneDomain, { paneClass } from "./paneSystem";
import Counter from "./counter";

export default function makeApplicationRoot(element: HTMLElement) {
    const onPointerDown = makePaneDomain(element);
    render(() => (<>
        <div class={paneClass} on:pointerdown={onPointerDown}>{createPlayerNameForm()}</div>
        <div class={paneClass} on:pointerdown={onPointerDown}><Counter /></div>
        </>), element);
}
