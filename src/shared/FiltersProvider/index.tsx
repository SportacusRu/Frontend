"use client";
import { createContext, useContext, useReducer } from "react";
import { FiltersContextProps } from "./types";
import filtersReducer from "./reducer";



const FiltersContext = createContext<FiltersContextProps>({} as FiltersContextProps);

export const useFilters = () => useContext(FiltersContext);


export default function FiltersProvider(
    {children}: {children: React.ReactNode}
) {
    const filters = useReducer(filtersReducer, { filters: [], category: ""});
    return (
        <FiltersContext.Provider value={filters}>
            {children}
        </FiltersContext.Provider>
    )
}