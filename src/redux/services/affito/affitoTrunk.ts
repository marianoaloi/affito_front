import { createAsyncThunk } from "@reduxjs/toolkit";
import getAffiti, { setAffitoState, setDescription, setManyAffitoState } from "./affitoService";
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

export const clearAffitoError = createAsyncThunk(
  'affito/clearAffitoError',  () => {
    return undefined;
  });

export const updateAffitoDescription = createAsyncThunk(
  'affito/updateAffitoDescription',
  async ({ realEstateId, description, token }: { realEstateId: string | number, description: string, token: string }) => {
    return await setDescription(realEstateId, description, token);
  }
);

export const updateManyAffitoState = createAsyncThunk(
  'affito/updateManyAffitoState', 
  async ({ realEstateIds, newState, token }: { realEstateIds:  number[], newState: number, token: string }): Promise<{ids:number[],state:number}> => {
    const result = await setManyAffitoState(realEstateIds, newState, token);
    return result;
  }
);