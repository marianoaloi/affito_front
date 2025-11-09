import { createAsyncThunk } from "@reduxjs/toolkit";
import getStatistics from "./statisticsService";

export const fetchStatistics = createAsyncThunk(
  'statistics/fetchStatistics',
  async () => {
    return await getStatistics();
  }
);
