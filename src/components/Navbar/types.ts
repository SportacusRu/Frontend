import { Dispatch, SetStateAction } from "react"
import { Icons } from "../Icon/types"

type NavbarItemObject = {
    title: string,
    icon: Icons
}


export type NavbarProps = {
    items: Array<NavbarItemObject>,
    screen: number,
    setScreen: Dispatch<SetStateAction<number>>
}