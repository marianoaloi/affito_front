import { createAsyncThunk } from "@reduxjs/toolkit";
import getAffiti, { setAffitoState } from "./affitoService";
import { FilterAffito } from "../filter/filterTypes";

export const fetchAffito = createAsyncThunk(
  'affito/fetchAffito',
  async (filter: FilterAffito) => {
    return await getAffiti(filter);
  }
);

export const updateAffitoState = createAsyncThunk(
  'affito/updateAffitoState',
  async ({ realEstateId, newState, token }: { realEstateId: string | number, newState: number, token: string }) => {
    return await setAffitoState(realEstateId, newState, token);
  }
);
