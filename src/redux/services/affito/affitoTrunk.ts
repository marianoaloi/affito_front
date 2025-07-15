import { createAsyncThunk } from "@reduxjs/toolkit";
import getAffiti from "./affitoService";

export const fetchAffito = createAsyncThunk('affito/fetchAffito',getAffiti);
