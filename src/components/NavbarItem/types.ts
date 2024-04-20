import { ReactNode } from "react"
import { Icons } from "../Icon/types"

export type NavbarItemProps = {
    iconType: Icons,
    active: boolean,
    onClick?: () => void,
    children: ReactNode
}