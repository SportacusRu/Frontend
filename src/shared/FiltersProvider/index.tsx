"use client";
import { createContext, useContext, useReducer } from "react";
import { FiltersContextProps, FiltersState } from "./types";
import filtersReduser from "./reducer";



const FiltersContext = createContext<FiltersContextProps>({} as FiltersContextProps);

export const useFilters = () => useContext(FiltersContext);


export default function FiltersProvider(
    {children}: {children: React.ReactNode}
) {
    const filtersReducer = useReducer(filtersReduser, { filters: [], category: ""});
    return (
        <FiltersContext.Provider value={filtersReducer}>
            {children}
        </FiltersContext.Provider>
    )
}