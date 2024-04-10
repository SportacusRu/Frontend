import React from "react"

export enum ButtonType {
    MainColor, 
    Primary,
    PrimaryDark,
    Dangerous,
    DangerousDark,
    Outline,
    Circle
}

export type ButtonProps = {
    type: ButtonType
    children: React.ReactNode
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}