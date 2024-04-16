import { TagProps } from "./types";
import s from "./Tag.module.css";
import { SubheadUppercase } from "../Typography";
import classNames from "@/extensions/classNames";


function Tag({children, active} : TagProps) {
    const classes = classNames(s.Tag, active ? s.active : "");
    return (
        <div className={classes}>
            <SubheadUppercase>
                {children}
            </SubheadUppercase>
        </div>
    )
}

export default Tag