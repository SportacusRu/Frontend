import { PLACES_FILTERS } from "@/config/config";
import Icon from "../Icon";
import { IconSize } from "../Icon/types";

import s from "./Filter.module.css";
import { FilterProps } from "./types";
import classNames from "@/extensions/classNames";
import { Caption } from "../Typography";


export default function({type, onClick, active}: FilterProps) {
    const filterName = PLACES_FILTERS[type-14]
    const classes = classNames(s.filter, active ? s.active : "")

    const handleClick = () => {
        onClick(filterName)
    }
    return (
        <div className={classes} onClick={handleClick}>
            <div>
                <Icon type={type} size={IconSize.L}/>
            </div>
            <Caption>{filterName}</Caption>
        </div>
    )
}