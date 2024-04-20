"use client";
import Icon from "../Icon"
import { SubheadMedium } from "../Typography"
import { colorsList } from "../color"
import s from "./MenuItem.module.css"
import { MenuItemProps } from "./types"


export default function({children, icon, onClick, color} : MenuItemProps) {
    const colorValue = colorsList[color]
    return (
        <span className={s.menuItem} onClick={onClick} style={{color: colorValue}}>
            <Icon type={icon} color={color}/>
            <SubheadMedium>
                { children }
            </SubheadMedium>
        </span>
    )
}