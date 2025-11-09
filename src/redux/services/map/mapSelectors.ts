import { ReduxState } from '@/redux/store';

export const selectMapState = (state: ReduxState) => state.map;
export const selectMapLatitude = (state: ReduxState) => state.map.latitude;
export const selectMapLongitude = (state: ReduxState) => state.map.longitude;
export const selectMapZoom = (state: ReduxState) => state.map.zoom;
export const selectMapCenter = (state: ReduxState) => ({
  latitude: state.map.latitude,
  longitude: state.map.longitude,
});
export const selectMapPosition = (state: ReduxState) => ({
  latitude: state.map.latitude,
  longitude: state.map.longitude,
  zoom: state.map.zoom,
});