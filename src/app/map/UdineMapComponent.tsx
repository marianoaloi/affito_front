"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import L from "leaflet";
import { Photo, Photos } from "./UdineMapComponent.styled";
import { selectAllAffito, useSelector } from "@/redux";

const UDINE_POSITION: LatLngTuple = [46.0689, 13.2224];

export default function UdineMapComponent() {


    const affiti = useSelector(selectAllAffito);
    useEffect(() => {
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
        <div style={{ height: "100vh", width: "100%" }}>
            <MapContainer center={UDINE_POSITION} zoom={13} style={{ height: "calc(100% - 65px)", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {affiti.map((affito) => {
                    const propt = affito.realEstate.properties[0];
                    const { latitude, longitude } = propt.location;
                    return (
                        <Marker key={affito.realEstate.id} position={[latitude, longitude]}>
                            <Popup>
                                <div>
                                    <a
                                        href={`https://www.immobiliare.it/annunci/${affito._id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: '#1976d2', textDecoration: 'underline' }}
                                    >
                                        <h2>{affito.realEstate.price.formattedValue}</h2>
                                    </a>
                                    <p>{affito.realEstate.title}</p>
                                    <Photos>
                                        {propt.multimedia.photos.slice(0,9).map((photo, index) => (
                                            <Photo key={index} src={photo.urls.small} alt={`Photo ${index + 1}`} />
                                        ))}
                                    </Photos>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}
