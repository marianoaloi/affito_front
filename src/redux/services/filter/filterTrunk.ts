import { createAsyncThunk } from "@reduxjs/toolkit";
import { FilterAffito } from "./filterTypes";

export const setFilterAffito = createAsyncThunk(
  'filter/setFilterAffito',
  async (filter: FilterAffito) => {
    // In a real app, you might fetch filtered data here
    return filter;
  }
);
