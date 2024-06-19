import { Icons } from "../Icon/types";

export type FilterProps = {
    type: Icons
    onClick: (filterName: string) => void
    active?: boolean
}