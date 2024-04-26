"use client";
import useScreen, { PAGES } from "@/hooks/useScreen"
import NavbarItem from "../NavbarItem"
import NavbarWrapper from "../NavbarWrapper"
import { NavbarProps } from "./types"
import { Client } from "@/client";


export default function({ items } : NavbarProps) {
    const [screen, setScreen] = useScreen();
    return (
        <NavbarWrapper>
        {
            items.map((item, i) => <NavbarItem 
                iconType={item.icon} 
                key={i}
                active={screen == i}
                visible={(i == PAGES.Main && !Client.authorized)}
                onClick={() => setScreen(i)}
            >
                {item.title}
            </NavbarItem>)
        }
        </NavbarWrapper>
    )
}