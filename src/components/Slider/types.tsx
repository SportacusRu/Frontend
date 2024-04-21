export type SliderProps = {
    slides: JSX.Element[],
    data: SliderData
    link?: SliderLink
}

type SliderData = {
    title: string,
    description?: string
}

type SliderLink = {
    title: string,
    onClick?: () => void
}