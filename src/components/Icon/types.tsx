import { Colors } from "../color"

export enum Icons {
    add,
    arrowCircle,
    complaints,
    edit,
    filter,
    home,
    like, 
    more,
    profile,
    radar,
    share,
    unlike,
    arrowLeft,
    trash,
}

export type IconProps = {
    type: Icons
    color: Colors
}
