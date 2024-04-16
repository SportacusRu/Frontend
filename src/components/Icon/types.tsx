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

export enum IconSize {
    S, M, L
}

export type IconProps = {
    type: Icons
    color: Colors
    size?: IconSize
}
