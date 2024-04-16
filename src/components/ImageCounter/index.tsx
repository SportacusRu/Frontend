import { Caption } from "../Typography";
import s from "./ImageCounter.module.css"
import { ImageCounterProps } from "./types"

function ImageCounter({ count, position }: ImageCounterProps) {
    return <div className={s.counter}>
        <Caption>{position}/{count}</Caption>
    </div>
}

export default ImageCounter;