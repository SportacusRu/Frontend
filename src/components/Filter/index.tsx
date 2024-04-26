"use client";
import { PLACES_FILTERS } from "@/config/config";
import Icon from "../Icon";
import { IconSize } from "../Icon/types";

import s from "./Filter.module.css";
import { FilterProps } from "./types";
import classNames from "@/extensions/classNames";
import { useState } from "react";
import { Caption } from "../Typography";


export default function({type, onClick}: FilterProps) {
    const filterName = PLACES_FILTERS[type-14]
    const [active, setActive] = useState(false)
    const classes = classNames(s.filter, active ? s.active : "")

    const handleClick = () => {
        setActive(!active)
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