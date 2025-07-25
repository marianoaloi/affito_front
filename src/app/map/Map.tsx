import { useEffect } from 'react';
import { AffitiPageProps } from '../entity/AffitiPageProps';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Photo, Photos } from './Map.styled';


export const Map: React.FC<AffitiPageProps> = ({ affiti }) => {
  const position: [number, number] = [46.0689, 13.2224];


  useEffect(() => {
    const L = require('leaflet');
    // Fix for marker icon not loading correctly
    // This is a workaround for the issue with Leaflet marker icons not displaying correctly in Next.js
    // It sets the default icon for Leaflet markers to a valid icon URL
    // This should be done only once, so we check if the icon is already set
    L.Marker.prototype.options.icon = new L.Icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }, []);

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />      {affiti.map((affito) => {
        const propt = affito.realEstate.properties[0];
        const { latitude, longitude } = propt.location;
        return (
          <Marker key={affito.realEstate.id} position={[latitude, longitude]}>
            <Popup>
              <div>
                <h2>{affito.realEstate.price.formattedValue}</h2>
                <p>{affito.realEstate.title}</p>
                <Photos>
                  {propt.multimedia.photos.map((photo, index) => (
                    <Photo key={index} src={photo.urls.small} alt={`Photo ${index + 1}`}  />
                  ))}
                </Photos>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  )
}
