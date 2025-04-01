type Position = {
    x: number;
    y: number;
};
/* Using CSS selector notation:

   .pane is a movable window-like thing.

   .pane .pane-structure, .pane-grab are the things that are grabbable to move
   the .pane

   .pane-structure is for an element that is grabbable, but it's children
   shouldn't be grabbable.

   .pane-grab is for for an element that is grabbable, and all it's chilren
   should be grabbable.
*/

export default function makePaneDomain(domain: HTMLElement): (event: PointerEvent) => void {
    let dragging_pane: HTMLElement | null = null;
    let dragging_domain = domain;
    let dragging_pane_offset_position: Position | null = null;
    let dragging_pointer: number | null = null;

    function registerCurrentDraggingPane(element: HTMLElement) {
        if (dragging_pane !== null) {
            console.debug("Already dragging:", dragging_pane);
        } else {
            dragging_pane = element;
            document.addEventListener("pointerup", pointerUp);
            document.addEventListener("pointercancel", pointerUp);
            document.addEventListener("lostpointercapture", pointerUp);
            dragging_domain!.addEventListener("pointermove", pointerMove);
        }
    }
    function pointerUp(event: PointerEvent) {
        if (dragging_pointer !== null && event.pointerId !== dragging_pointer) { return; }
        // console.debug("pointerUp");
        document.removeEventListener("pointerup", pointerUp);
        document.removeEventListener("pointercancel", pointerUp);
        document.removeEventListener("lostpointercapture", pointerUp);
        dragging_domain!.removeEventListener("pointermove", pointerMove);
        dragging_pane = null;
        dragging_pane_offset_position = null;
        event.stopPropagation();
    }
    function pointerMove(event: PointerEvent) {
        if (event.pointerId !== dragging_pointer) { return; }
        event.stopPropagation();
        console.assert(dragging_pane_offset_position != null && dragging_pane != null);

        let { x, y } = dragging_pane_offset_position!;

        (dragging_pane!.style.left as any) = CSS.px(event.clientX - x);
        (dragging_pane!.style.top as any) = CSS.px(event.clientY - y);
    }
    function onPointerDown(event: PointerEvent) {
        if (event.isPrimary && event.currentTarget !== null && event.target !== null) {
            let valid_selection = (event.currentTarget === event.target);
            valid_selection ||= (event.target as HTMLElement).classList.contains('pane-structure');
            if (!valid_selection) {
                let ancestry_selector: HTMLElement | null = event.target as HTMLElement;
                while (ancestry_selector !== null && !ancestry_selector.classList.contains('pane')) {
                    if (ancestry_selector.classList.contains('pane-grab')) {
                        valid_selection = true;
                        break;
                    } else {
                        ancestry_selector = ancestry_selector.parentElement;
                    }
                }
            }
            if (valid_selection) {
                registerCurrentDraggingPane(event.currentTarget as HTMLElement);
                dragging_pointer = event.pointerId;
                const element_box = (event.target as HTMLElement).getBoundingClientRect();
                const this_box = (event.currentTarget as HTMLElement).getBoundingClientRect();
                dragging_pane_offset_position = {
                    x: event.offsetX + (element_box.x - this_box.x),
                    y: event.offsetY + (element_box.y - this_box.y)
                };
                event.stopPropagation();
            }
        }
    }
    return onPointerDown;
}
