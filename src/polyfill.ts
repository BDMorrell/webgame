export default function polyfill() {
    if (!CSS.px || typeof CSSUnitValue === "undefined") {
        console.info("Polyfill needed and loaded: CSS.px");
        // TypeScript isn't going to like the following line. It's going to
        // expect CSS.px to be of type `(number)=>CSSUnitValue`, but the
        // polyfill is for browsers that don't impolement the CSS Houdini typed
        // object model level 1 specification.
        // Please see: <https://bugzilla.mozilla.org/show_bug.cgi?id=1278697>
        //
        // @ts-expect-error as noted above
        globalThis.CSS.px = (value: number) => (String(value) + "px")
    }
}
