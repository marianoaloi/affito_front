import { ReduxState } from "@/redux/store";

export const selectAllAffito = (state: ReduxState) => state.affiti.data;
export const getErrorAffito = (state: ReduxState) => state.affiti.error;