import React from "react"

export type LinkProps = {
    href?: string
    onClick?: () => void
    children: React.ReactNode
    icon?: React.ReactNode
}