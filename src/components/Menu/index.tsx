"use client"
import s from "./Menu.module.css"
import { Menu, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Icon from "../Icon";
import { Icons } from "../Icon/types";
import { Colors } from "../color";
import { ReactNode } from "react";
import classNames from "@/extensions/classNames";


export default function({children, color, circle}: {children: ReactNode, color?: Colors, circle?: boolean}) {
    const menuButton = <MenuButton className={classNames(s.menuButton, circle ? s.Circle : "")}>
        <Icon type={Icons.more} color={color ? color : Colors.greyDark}/>
    </MenuButton>
    return (
        <Menu
            direction="left"
            reposition="initial"
            menuButton={menuButton} 
            menuClassName={s.menu}
        >
            {children}
        </Menu>
    )
}