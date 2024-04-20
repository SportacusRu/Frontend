import Icon from "../Icon";
import { Icons } from "../Icon/types";
import { SubheadMedium } from "../Typography";
import { Colors } from "../color";

import s from "./MoreLinksItem.module.css";
import { MoreLinksItemProps } from "./types";

export default function({ children, onClick }: MoreLinksItemProps) {
    return <div className={s.MoreLinksItem} onClick={onClick}>
        <SubheadMedium>{children}</SubheadMedium>
        <Icon type={Icons.arrowLeft} color={Colors.greyDark}/>
    </div>
}