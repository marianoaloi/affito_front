import { ReduxState } from "@/redux/store";

export const selectAllStatistics = (state: ReduxState) => state.statistics.data;
export const getErrorStatistics = (state: ReduxState) => state.statistics.error;
export const isLoadingStatistics = (state: ReduxState) => state.statistics.loading === 'pending';
export const isErrorStatistics = (state: ReduxState) => state.statistics.loading === 'failed';
