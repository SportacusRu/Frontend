import { ReactNode, MouseEvent } from "react"

export enum ButtonType {
    MainColor, 
    Primary,
    PrimaryDark,
    Danger,
    DangerDark,
    Outline,
    Circle,
    Icon
}

export type ButtonProps = {
    type: ButtonType
    icon?: ReactNode
    children?: ReactNode
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}