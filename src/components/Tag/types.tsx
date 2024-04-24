import { MouseEvent } from "react"

export type TagProps = {
    children: React.ReactNode
    active?: boolean
    onClick?: () => void
}