import { affitoReducer, filterReducer } from "./services";
import { authReduce } from "./services/auth/authSlice";

export const reducer = {
    affiti: affitoReducer,
    filter: filterReducer,
    auth: authReduce,
}