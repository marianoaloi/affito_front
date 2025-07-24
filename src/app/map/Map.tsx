'use client'



// It's necessary to import the marker icon images
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useEffect } from 'react';
import { AffitiPageProps } from '../entity/AffitiPageProps';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

let DefaultIcon ;

useEffect(() => {
  
  L.Marker.prototype.options.icon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}, []);

export const Map : React.FC<AffitiPageProps> = ({ affiti }) => {
  const position: [number, number] = [46.0689, 13.2224];

  return (<>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{height: 400, width: "100%"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {affiti.map((affito) => {
          const lat = affito.realEstate.properties[0].location.latitude;
          const lon = affito.realEstate.properties[0].location.longitude;
          return (
            <Marker key={affito.realEstate.id} position={[lat, lon]} >
              <Popup>
                {affito.realEstate.title}
              </Popup>
            </Marker>
          )
        })}
      </MapContainer> 
    </>
  )
}
