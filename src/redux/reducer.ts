import { affitoReducer, counterReducer, filterReducer, mapReducer, statisticsReducer } from "./services";
import { affitoApi } from "./services/affito/affitoApi";

export const reducer = {
    affiti: affitoReducer,
    filter: filterReducer,
    map: mapReducer,
    statistics: statisticsReducer,
    counter: counterReducer,
    [affitoApi.reducerPath]: affitoApi.reducer,
}