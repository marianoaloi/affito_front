import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clearAffitoError, fetchAffito, updateAffitoState } from './affitoTrunk';
import { AffitoEntity } from '@/app/entity/AffitoEntity';

interface AffitoState {
  data: AffitoEntity[] ;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AffitoState = {
  data: [],
  loading: 'idle',
  error: null,
};

const affitoSlice = createSlice({
  name: 'affito',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
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
      
      .addCase(updateAffitoState.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(updateAffitoState.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(updateAffitoState.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const { realEstateId, newState } = action.meta.arg;
        const affito = state.data.find(a => a.realEstate.id === realEstateId);
        const status = action.payload.success;
        if (affito && status) {
          affito.stateMaloi = newState;
        }else
        {
          state.error = !affito ? "Affito not found" : action.payload.message
        }
      });
  },
});

export const affitoActions = affitoSlice.actions;

export const affitoReducer = affitoSlice.reducer;

export const affitoSelectors = affitoSlice.selectors;