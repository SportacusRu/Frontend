import React, { ReactNode } from "react"

export enum ButtonType {
    MainColor, 
    Primary,
    PrimaryDark,
    Danger,
    DangerDark,
    Outline,
    Circle
}

export type ButtonProps = {
    type: ButtonType
    icon?: ReactNode
    children?: ReactNode
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}