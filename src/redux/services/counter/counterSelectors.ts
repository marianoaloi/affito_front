import { ReduxState } from '@/redux/store';

export const selectAllCount = (state: ReduxState) => state.counter.data;
export const getErrorCounter = (state: ReduxState) => state.counter.error;
export const isLoadingCounter = (state: ReduxState) => state.counter.loading === 'pending';
export const isErrorCounter = (state: ReduxState) => state.counter.loading === 'failed';
