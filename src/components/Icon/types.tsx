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
    alpineSkiing,
    athletics,
    bars,
    basketBall,
    crossCountry,
    figureSkating,
    footBall,
    volleyBall,
    hockey,
    horizontalBars,
    hyperextensy,
    LegsBending,
    legs,
    pedometr,
    pendulum,
    pressSiting,
    rowing,
    stepper,
    tableTennis,
    tennis,
    triathlon,
    twister,
    verticalBars
}

export const allFilters = [
    Icons.alpineSkiing,
    Icons.athletics,
    Icons.bars,
    Icons.basketBall,
    Icons.crossCountry,
    Icons.figureSkating,
    Icons.footBall,
    Icons.volleyBall,
    Icons.hockey,
    Icons.horizontalBars,
    Icons.hyperextensy,
    Icons.LegsBending,
    Icons.legs,
    Icons.pedometr,
    Icons.pendulum,
    Icons.pressSiting,
    Icons.rowing,
    Icons.stepper,
    Icons.tableTennis,
    Icons.tennis,
    Icons.triathlon,
    Icons.twister,
    Icons.verticalBars
] as const;


export enum IconSize {
    S, M, L
}

export type IconProps = {
    type: Icons
    color?: Colors
    size?: IconSize
}
