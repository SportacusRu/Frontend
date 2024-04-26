import { Icons } from "../Icon/types"

type NavbarItemObject = {
    title: string,
    icon: Icons
}


export type NavbarProps = {
    items: ReadonlyArray<NavbarItemObject>,
}