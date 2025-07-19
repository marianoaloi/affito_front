import { createSlice } from "@reduxjs/toolkit";
import { setFilterAffito } from "./filterTrunk";
import { FilterAffito } from "./filterTypes";
import Cookies from "js-cookie";

interface FilterState {
  filter: FilterAffito;
}

const FILTER_COOKIE_KEY = "affito_filter";

function getInitialFilter(): FilterAffito {
  const cookie = Cookies.get(FILTER_COOKIE_KEY);
  if (cookie) {
    try {
      return JSON.parse(cookie);
    } catch {
      return {};
    }
  }
  return {};
}

const initialState: FilterState = {
  filter: getInitialFilter(),
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {},
  selectors: {
    getFilter: (state) => state.filter,
  },
  extraReducers: (builder) => {
    builder.addCase(setFilterAffito.fulfilled, (state, action) => {
      state.filter = action.payload;
      Cookies.set(FILTER_COOKIE_KEY, JSON.stringify(action.payload));
    });
  },
});

export const filterReducer = filterSlice.reducer;
export const filterActions = filterSlice.actions;
export const getFilter = filterSlice.selectors.getFilter;
