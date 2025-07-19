import { ReduxState } from "@/redux/store";

export const selectFilter = (state: ReduxState) => state.filter.filter;