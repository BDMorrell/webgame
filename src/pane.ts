type Position = {
    x: number;
    y: number;
};

interface DraggingCtx {
    pane: HTMLElement,
    offset_position: Position,
    pointer_id: number,
}
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
    const dragging_domain = domain;
    let dragging_context: DraggingCtx | null = null;

    function registerCurrentDraggingPane(element: HTMLElement) {
        if (dragging_context !== null) {
            console.debug("Already dragging:", dragging_context.pane);
        } else {
            // dragging_context.pane = element;
            document.addEventListener("pointerup", pointerUp);
            document.addEventListener("pointercancel", pointerUp);
            document.addEventListener("lostpointercapture", pointerUp);
            dragging_domain!.addEventListener("pointermove", pointerMove);
        }
    }
    function pointerUp(event: PointerEvent) {
        if (dragging_context === null) { console.error("pointerUp fired for a pane that has no dragging_context!"); return; }
        // Checing the pointer_id can cause any mistake on our end to not be
        // fixable by the user.
        // This will cause bugs for multiple pointers, but I would rather have
        // something clunky then something that forces the user to reload the
        // page.
        // If this changes in the future, we better make sure we don't make
        // any mistakes on our end.

        document.removeEventListener("pointerup", pointerUp);
        document.removeEventListener("pointercancel", pointerUp);
        document.removeEventListener("lostpointercapture", pointerUp);
        dragging_domain!.removeEventListener("pointermove", pointerMove);
        dragging_context = null;
        event.stopPropagation();
    }
    function pointerMove(event: PointerEvent) {
        if (dragging_context === null) { console.error("pointerMove fired for a pane that has no dragging_context!"); return; }
        if (event.pointerId !== dragging_context?.pointer_id) { return; }
        event.stopPropagation();

        const { x, y } = dragging_context.offset_position;

        dragging_context.pane.style.left = CSS.px(event.clientX - x);
        dragging_context.pane.style.top = CSS.px(event.clientY - y);
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
                const element_box = (event.target as HTMLElement).getBoundingClientRect();
                const this_box = (event.currentTarget as HTMLElement).getBoundingClientRect();
                const domain_box = dragging_domain.getBoundingClientRect();
                registerCurrentDraggingPane(event.currentTarget as HTMLElement);
                dragging_context = {
                    pane: event.currentTarget as HTMLElement,
                    offset_position: {
                        x: event.offsetX + (element_box.x - this_box.x + domain_box.x),
                        y: event.offsetY + (element_box.y - this_box.y + domain_box.y),
                    },
                    pointer_id: event.pointerId,
                };
                event.stopPropagation();
            }
        }
    }
    return onPointerDown;
}
