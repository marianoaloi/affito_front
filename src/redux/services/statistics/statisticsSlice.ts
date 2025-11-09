import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchStatistics } from './statisticsTrunk';
import { AffitoEntity } from '@/app/entity/AffitoEntity';

interface StatisticsState {
  data: AffitoEntity[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StatisticsState = {
  data: [],
  loading: 'idle',
  error: null,
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchStatistics.fulfilled, (state, action: PayloadAction<AffitoEntity[]>) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const statisticsActions = statisticsSlice.actions;

export const statisticsReducer = statisticsSlice.reducer;

export const statisticsSelectors = statisticsSlice.selectors;
