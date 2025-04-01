export default function polyfill() {
    if (!CSS.px || typeof CSSUnitValue === "undefined") {
        console.info("Polyfill needed and loaded: CSS.px");
        (globalThis.CSS.px as any) = (value: number) => (String(value) + "px")
    }
}
