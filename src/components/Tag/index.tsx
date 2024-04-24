import { TagProps } from "./types";
import s from "./Tag.module.css";
import { SubheadUppercase } from "../Typography";
import classNames from "@/extensions/classNames";


function Tag({children, active, onClick} : TagProps) {
    const classes = classNames(s.Tag, active ? s.active : "")

    return (
        <div className={classes} onClick={onClick}>
            <SubheadUppercase>
                {children}
            </SubheadUppercase>
        </div>
    )
}

export default Tag