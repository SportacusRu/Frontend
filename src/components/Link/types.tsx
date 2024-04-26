import { ReactNode } from "react"

export type LinkProps = {
    href?: string
    onClick?: () => void
    children: ReactNode
    icon?: ReactNode
}