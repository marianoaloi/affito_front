import { ReduxState } from "@/redux/store";

export const selectAllAffito = (state: ReduxState) => state.affiti.data;
export const getCounts = (state: ReduxState) => state.affiti.counts;
export const getErrorAffito = (state: ReduxState) => state.affiti.error;
export const isLoadingAffito = (state: ReduxState) => state.affiti.loading === 'pending';
export const isErrorAffito = (state: ReduxState) => state.affiti.loading === 'failed';