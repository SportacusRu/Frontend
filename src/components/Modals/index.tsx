import classNames from "@/extensions/classNames"
import s from "./Modal.module.scss"
import { DetailedHTMLProps, HTMLAttributes, useState } from "react"


export default function Modal({children, background, top, opacity} : {
    children: React.ReactNode, background: boolean, 
    top?: boolean, opacity?: number
}) {
    const classes = useState()
    const contentClasses = classNames(
        s.content, top ? s.TopContent : s.BottomContent
    )
    const backgroundClasses = classNames(
        s.background, top ? s.TopBackground : s.BottomBackground
    )
    return (
        <div className={s.modal} >
            <div className={contentClasses}>
                {children}
            </div>
            {background ? <div className={backgroundClasses} style={{opacity: opacity}}></div> : <></>}
        </div>
    )
}