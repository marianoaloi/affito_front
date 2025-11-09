import { affitoReducer, filterReducer, mapReducer, statisticsReducer } from "./services";

export const reducer = {
    affiti: affitoReducer,
    filter: filterReducer,
    map: mapReducer,
    statistics: statisticsReducer,
}