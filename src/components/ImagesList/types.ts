import { Dispatch, SetStateAction } from "react"

export type ImagesListProps = {
    images: string[],
    setImages: Dispatch<SetStateAction<string[]>>
}