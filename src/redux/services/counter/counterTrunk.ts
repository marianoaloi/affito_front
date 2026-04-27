import { createAsyncThunk } from '@reduxjs/toolkit';
import getCount from './counterService';

export const fetchCount = createAsyncThunk(
  'counter/fetchCount',
  async () => {
    return await getCount();
  }
);
