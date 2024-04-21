import Scrollbars from "react-custom-scrollbars-2"
import s from "./Scrollbar.module.scss"
import { ScrollbarProps } from "./types"

export default function({ children, className }: ScrollbarProps) {
    return <Scrollbars 
        autoHide
        universal
        autoHideDuration={300}
        autoHideTimeout={100}
        renderTrackVertical={props => <div {...props} className={s.verticalTrack}/>}
        renderThumbVertical={props => <div {...props} className={s.verticalThumb}/>}
        className={className}
    >
        {children}
    </Scrollbars>
}