import s from "./Modal.module.scss"


export default function Modal(
    {children, background} : {children: React.ReactNode, background: boolean}
) {
    return (
        <div className={s.modal}>
            <div className={s.content}>
                {children}
            </div>
            {background ? <div className={s.background}></div> : <></>}
            
        </div>
    )
}