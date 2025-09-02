"use client";
import { ReactNode, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import L, { icon } from "leaflet";
import { Photo, Photos } from "./UdineMapComponent.styled";
import { selectAllAffito, useSelector } from "@/redux";
import { AffitoEntity } from "../entity/AffitoEntity";
import './UdineMapComponent.css'

const UDINE_POSITION: LatLngTuple = [46.0689, 13.2224];


function affitoDataBase(affito: AffitoEntity): ReactNode {
    const propt = affito.realEstate.properties[0];
    const { latitude, longitude } = propt.location;
    return (
        <Marker key={affito.realEstate.id}
            position={[latitude, longitude]}
            icon={icon({
                // html: `<span class="spanMark" style="${styleLocation(affito)}" >${affito.realEstate.price.value}</span>`,
                iconUrl: 
                
                affito.stateMaloi != undefined ?
        (
            affito.stateMaloi === 0 ? "/marker-icon-deny.png" :
                affito.stateMaloi === 1 ? "/marker-icon-approve.png" :
                    "/marker-icon-wait.png") :
        "/marker-icon.png"
                
                ,
                // className: "iconMark"
                            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
            })}
        >
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
                        {propt.multimedia.photos.slice(0, 9).map((photo, index) => (
                            <Photo key={index} src={photo.urls.small} alt={`Photo ${index + 1}`} />
                        ))}
                    </Photos>
                </div>
            </Popup>
        </Marker>
    );
}

export default function UdineMapComponent() {


    const affiti = useSelector(selectAllAffito);
    const [affitiInMap, setAffitiInMap] = useState<ReactNode[]>([])
    useEffect(() => {
        const affitiAux = affiti.map(affitoDataBase);
        const meIcon = L.divIcon(
            {
                html: '<i class="fas fa-map-marker-alt" style="    font-size: 2em;    margin-top: -0.6em;    margin-left: -0.6em;    position: absolute;">🫵</i>',


            }
        )
        const possitionOk = (loc: GeolocationPosition) => {
            const myLocal = (<Marker
                key={'ME'}
                position={[loc.coords.latitude, loc.coords.longitude]}
                icon={meIcon}
            >

            </Marker>)
            affitiAux.push(myLocal)

            setAffitiInMap(affitiAux)
        }
        const possitionError = (err: GeolocationPositionError) => {
            console.error(err)
            setAffitiInMap(affitiAux)
        }
        navigator.geolocation.getCurrentPosition(possitionOk, possitionError)
        // Fix for marker icon not loading correctly
        // This is a workaround for the issue with Leaflet marker icons not displaying correctly in Next.js
        // It sets the default icon for Leaflet markers to a valid icon URL
        // This should be done only once, so we check if the icon is already set


        // L.Marker.prototype.options.icon = new L.Icon({
        //     iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        //     shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        //     iconSize: [25, 41],
        //     iconAnchor: [12, 41],
        //     popupAnchor: [1, -34],
        //     shadowSize: [41, 41]
        // });

    }, []);




    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <MapContainer center={UDINE_POSITION} zoom={13} style={{ height: "calc(100% - 65px)", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {affitiInMap}
            </MapContainer>
        </div>
    );
}
