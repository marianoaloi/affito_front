import { createAsyncThunk } from "@reduxjs/toolkit";
import getAffiti, { setAffitoState } from "./affitoService";

export const fetchAffito = createAsyncThunk('affito/fetchAffito',getAffiti);

export const updateAffitoState = createAsyncThunk(
  'affito/updateAffitoState',
  async ({ realEstateId, newState }: { realEstateId: string | number, newState: number }) => {
    return await setAffitoState(realEstateId, newState);
  }
);
