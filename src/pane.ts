import paneClasses from './pane.module.css';
export { paneClasses };

type Position = {
    x: number;
    y: number;
}

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
    domain.classList += paneClasses.paneDomain;

    function registerDraggingEventListeners() {
        document.addEventListener("pointerup", pointerUp);
        document.addEventListener("pointercancel", pointerUp);
        document.addEventListener("lostpointercapture", pointerUp);
        dragging_domain.addEventListener("pointermove", pointerMove);
    }

    function clearDraggingEventListeners() {
        document.removeEventListener("pointerup", pointerUp);
        document.removeEventListener("pointercancel", pointerUp);
        document.removeEventListener("lostpointercapture", pointerUp);
        dragging_domain.removeEventListener("pointermove", pointerMove);
    }

    function pointerUp(event: PointerEvent) {
        if (dragging_context === null) { warnDraggingContextMissing("pointerUp") }
        // Checing the pointer_id can cause any mistake on our end to not be
        // fixable by the user.
        // This will cause bugs for multiple pointers, but I would rather have
        // something clunky then something that forces the user to reload the
        // page.
        // If this changes in the future, we better make sure we don't make
        // any mistakes on our end.
        clearDraggingEventListeners();
        dragging_context = null;
        event.stopPropagation();
    }

    function pointerMove(event: PointerEvent) {
        if (dragging_context === null) { warnDraggingContextMissing("pointerMove") }
        if (event.pointerId !== dragging_context?.pointer_id) { return; }
        event.stopPropagation();
        const { x, y } = dragging_context.offset_position;
        dragging_context.pane.attributeStyleMap.set("left", CSS.px(event.clientX - x));
        dragging_context.pane.attributeStyleMap.set("top", CSS.px(event.clientY - y));
    }

    function onPointerDown(event: PointerEvent) {
        if (event.isPrimary && event.currentTarget !== null && event.target !== null) {
            let valid_selection = (event.currentTarget === event.target);
            valid_selection ||= (event.target as HTMLElement).classList.contains(paneClasses.paneStructure);
            if (!valid_selection) {
                let ancestry_selector: HTMLElement | null = event.target as HTMLElement;
                while (ancestry_selector !== null && !ancestry_selector.classList.contains(paneClasses.pane)) {
                    if (ancestry_selector.classList.contains(paneClasses.paneGrab)) {
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
                dragging_context = {
                    pane: event.currentTarget as HTMLElement,
                    offset_position: {
                        x: event.offsetX + (element_box.x - this_box.x + domain_box.x),
                        y: event.offsetY + (element_box.y - this_box.y + domain_box.y),
                    },
                    pointer_id: event.pointerId,
                };
                registerDraggingEventListeners();
                event.stopPropagation();
            }
        }
    }

    return onPointerDown;
}

function warnDraggingContextMissing(function_name: string) {
    console.error(`Missing dragging_context when expected for ${function_name}`)
}
