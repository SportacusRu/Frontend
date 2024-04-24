import { FiltersContextProps } from "@/shared/FiltersProvider/types"

export type FiltersSliderProps = {
    filters?: string[]
    category?: string
    reducer?: FiltersContextProps
}