import Icon from "../icon";
import cssClasses from "./material.module.css";
import type { Material } from "./material";
import { For } from "solid-js";

const classes = {
    list: cssClasses.materialList,
    tableHeader: cssClasses.tableHead,
};

const commonMaterials: Array<[Material, number]> = [
    [{ name: "wood", description: "Has a nice woody smell" }, 25],
    [{ name: "paper", description: "Can be written on" }, 5],
]

export default function MaterialList() {
    return <div class={classes.list}>
        <div class={classes.tableHeader}>
            <div>Materials</div>
            <button><Icon name="add" /></button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Ammount</th>
                </tr>
            </thead>
            <For each={commonMaterials}>
                {(stuff) => {
                    const [mat, qty] = stuff; return <tr>
                        <td>{mat.name}</td>
                        <td>{mat.description ?? ""}</td>
                        <td>{qty}</td>
                    </tr>;
                }}
            </For>
        </table>
    </div>;
}
