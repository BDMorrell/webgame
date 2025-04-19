import { createSignal } from "solid-js";
import {classes as paneClasses} from "./paneSystem";

export default function Counter() {
    const [count, setCount] = createSignal(0);
    const increment = () => {setCount((value)=>value+1)};
    return <div classList={{"gameForm": true, [paneClasses.paneStructure]: true}}>
        <hgroup classList={{"heading": true, [paneClasses.paneGrab]: true}}>
            <p>Counter</p>
        </hgroup>
        <p class={paneClasses.paneGrab}>Value is currently {count()}.</p>
        <button on:click={increment}>Increment</button>
    </div>;
}
