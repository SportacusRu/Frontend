"use client"
import s from "./Menu.module.css"
import { Menu, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Icon from "../Icon";
import { Icons } from "../Icon/types";
import { Colors } from "../color";


export default function({children}: {children: React.ReactNode}) {
    const menuButton = <MenuButton>
        <Icon type={Icons.more} color={Colors.greyDark}/>
    </MenuButton>
    return (
        <Menu 
            direction="bottom"
            menuButton={menuButton} 
            menuClassName={s.menu}
            transition
        >
            {children}
        </Menu>
    )
}