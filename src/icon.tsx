import 'material-symbols/outlined.css';
import type { MaterialSymbol } from 'material-symbols';

export default function Icon(props: {name: MaterialSymbol}) {
    return <span class="material-symbols-outlined">{props.name}</span>
}
