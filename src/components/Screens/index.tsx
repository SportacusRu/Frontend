import { ReactNode } from "react"
import s from "./Screen.module.scss"

type ScreensProps = {
    children: ReactNode[]
    screen: number
}

export default function({screen, children} : ScreensProps) {
    return <div className={s.screen}>
        {children[screen]}
    </div>
}