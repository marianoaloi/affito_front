import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from "js-cookie";

interface MapState {
  latitude: number;
  longitude: number;
  zoom: number;
  local: string;
}

const CookieName = 'affito_map_state';


// Cookie utilities
const getMapStateFromCookie = (): MapState | null => {
   const cookie = Cookies.get(CookieName);
  if (cookie) {
    try {
      return JSON.parse(cookie);
    } catch {
      return null;
    }
  }
  return null;
};

const saveMapStateToCookie = (state: MapState) => {
   
  try {
    Cookies.set(CookieName, JSON.stringify(state));
  } catch (error) {
    console.warn('Failed to save map state to cookie:', error);
  }
};

// Default Udine position
const defaultMapState: MapState = {
  latitude: 46.0689,
  longitude: 13.2224,
  zoom: 13,
  local: "Udine",
};

const triesteMapState: MapState = {
  latitude: 45.643837,
  longitude: 13.795002,
  zoom: 13,
  local: "Trieste",
};

const initialState: MapState = getMapStateFromCookie() || defaultMapState;

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMapPosition: (state, action: PayloadAction<{ latitude: number; longitude: number; zoom: number }>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.zoom = action.payload.zoom;
      
      // Save to cookie whenever state changes
      saveMapStateToCookie(state);
    },
    setMapCenter: (state, action: PayloadAction<{ latitude: number; longitude: number }>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      
      // Save to cookie whenever state changes
      saveMapStateToCookie(state);
    },
    setMapZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
      
      // Save to cookie whenever state changes
      saveMapStateToCookie(state);
    },
    resetMapToDefault: (state) => {
      state.latitude = defaultMapState.latitude;
      state.longitude = defaultMapState.longitude;
      state.zoom = defaultMapState.zoom;
      
      // Save to cookie
      saveMapStateToCookie(state);
    },
  },
});

export const mapActions = mapSlice.actions;
export const mapReducer = mapSlice.reducer;
export const mapSelectors = mapSlice.selectors;
export const triesteMapStateExport = triesteMapState;
export const defaultMapStateExport = defaultMapState;