import Icon from "../Icon";
import { NavbarItemProps } from "./types";
import s from "./NavbarItem.module.css";
import { Colors } from "../color";
import { Caption } from "../Typography";
import classNames from "@/extensions/classNames";

export default function({ iconType, active, onClick, children, visible }: NavbarItemProps) {
    const classes = classNames(s.navbarItem, active ? s.active : "");
    return <div 
        onClick={onClick} className={classes} 
        style={visible ? {display: "none"} : {}}
    >
        <Icon type={iconType} color={active ? Colors.accent : Colors.greyDark}/>
        <Caption>{children}</Caption>
    </div>
}
