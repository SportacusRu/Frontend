import { FiltersState, FiltersStateActions } from "./types";

export default function filtersReducer(
    state: FiltersState, action: FiltersStateActions
) : FiltersState {
    switch (action.type) {
        case "ADD_FILTER":
            return {
                category: state.category,
                filters: [...state.filters, action.payload],
            }
        case "REMOVE_FILTER": 
            return {
                category: state.category,
                filters: state.filters.filter(item => item != action.payload),
            }
        case "SET_CATEGORY":
            return {
                filters: state.filters,
                category: action.payload
            }
    }
}