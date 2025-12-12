import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clearAffitoError, countTrunk, fetchAffito, updateAffitoState } from './affitoTrunk';
import { AffitoEntity } from '@/app/entity/AffitoEntity';
import { ProvinceCountList } from '@/app/entity/CountEntity';

interface AffitoState {
  data: AffitoEntity[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  counts: ProvinceCountList;
}

const initialState: AffitoState = {
  data: [],
  loading: 'idle',
  error: null,
  counts: [],
};

const affitoSlice = createSlice({
  name: 'affito',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  selectors: {
    selectAllAffitoSelector: (state: AffitoState) => state.data,
    getCountsSelector: (state: AffitoState) => state.counts,
    getErrorAffitoSelector: (state: AffitoState) => state.error,
    isLoadingAffitoSelector: (state: AffitoState) => state.loading === 'pending',
    isErrorAffitoSelector: (state: AffitoState) => state.loading === 'failed',
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAffito.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchAffito.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAffito.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'An error occurred';
      })

      .addCase(clearAffitoError.fulfilled, (state) => {
        state.error = null;
      })

      // .addCase(updateAffitoState.pending, (state) => {
      //   // state.loading = 'pending';
      // })
      .addCase(updateAffitoState.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(updateAffitoState.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const { realEstateId, newState } = action.meta.arg;
        const affito = state.data.find(a => a._id === realEstateId);
        const status = action.payload.success;
        if (affito && status) {
          affito.stateMaloi = newState;
        } else {
          state.error = !affito ? "Affito not found" : action.payload.message
        }
      })

      .addCase(countTrunk.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.counts = action.payload
      })
      .addCase(countTrunk.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'An error occurred';

      })
  },
});

export const affitoActions = affitoSlice.actions;

export const affitoReducer = affitoSlice.reducer;

export const affitoSelectors = affitoSlice.selectors;
export const affitoCountSelectors = affitoSlice.selectors.getCountsSelector;