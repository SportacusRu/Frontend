import { NumberListProps } from "./types";
import s from "./NumberList.module.scss";


export default function({ range, state, setState }: NumberListProps) {
    return (
        <div className={s.numberList}>
        {
            range.map(number => <div 
                key={number} 
                className={state == number ? s.active : s.nonactive}
            ><p>{number}</p></div>)
        }
        </div>
    )
}