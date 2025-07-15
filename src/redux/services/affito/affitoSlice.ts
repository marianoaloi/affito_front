import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchAffito } from './affitoTrunk';

interface AffitoState {
  data: any;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AffitoState = {
  data: null,
  loading: 'idle',
  error: null,
};


const affitoSlice = createSlice({
  name: 'affito',
  initialState,
  reducers: {},
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
      });
  },
  selectors:{
    selectAll: (state) => state.data,
  }
});

export const affitoActions = affitoSlice.actions;

export const affitoReducer = affitoSlice.reducer;

export const affitoSelectors = affitoSlice.selectors;