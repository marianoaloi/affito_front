"use client";
import { ReactNode, useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import L, { icon } from "leaflet";
import { MarkerPopup, Photo, Photos } from "./UdineMapComponent.styled";
import { selectAllAffito, useSelector, useDispatch, mapActions, selectMapPosition } from "@/redux";
import { AffitoEntity } from "../entity/AffitoEntity";
import './UdineMapComponent.css'
import ChoiceState from "../component/ChoiceState";
import { defaultMapStateExport, triesteMapStateExport } from "@/redux/services/map/mapSlice";


function MapEventHandler() {
    const dispatch = useDispatch();

    const map = useMapEvents({
        moveend: () => {
            const center = map.getCenter();
            const zoom = map.getZoom();
            dispatch(mapActions.setMapPosition({
                latitude: center.lat,
                longitude: center.lng,
                zoom: zoom
            }));
        },
        zoomend: () => {
            const center = map.getCenter();
            const zoom = map.getZoom();
            dispatch(mapActions.setMapPosition({
                latitude: center.lat,
                longitude: center.lng,
                zoom: zoom
            }));
        }
    });

    return null;
}

function MapPositionUpdater({ mapRef }: { mapRef: React.MutableRefObject<L.Map | null> }) {
    const map = useMap();

    useEffect(() => {
        mapRef.current = map;
    }, [map, mapRef]);

    return null;
}


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
                    <ChoiceState stateMaloi={affito.stateMaloi} id={affito._id} />
                    <p>{affito.realEstate.title} [{propt.floor?.abbreviation} - {propt.featureList.find(x => x.type === 'elevator')?.compactLabel || '**'}]</p>
                    <Photos>
                        {propt.multimedia.photos.slice(0, 9).map((photo, index) => (
                            <Photo key={index} src={photo.urls.small} alt={`Photo ${index + 1}`} />
                        ))}
                    </Photos>
                    <a
                        href={`https://www.immobiliare.it/annunci/${affito._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#1976d2', textDecoration: 'underline' }}
                    >
                        <h2>{affito.realEstate.price.formattedValue}</h2>
                    </a>
                </div>
            </Popup>
        </Marker>
    );
}


export default function UdineMapComponent() {


    const dispatch = useDispatch();
    const mapRef = useRef<L.Map | null>(null);

    const affiti = useSelector(selectAllAffito);
    const mapState = useSelector(selectMapPosition);
    const [affitiInMap, setAffitiInMap] = useState<ReactNode[]>([]);

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


    const changeMap = (newMapState: { latitude: number; longitude: number; zoom: number }) => {
        dispatch(mapActions.setMapPosition({
            latitude: newMapState.latitude,
            longitude: newMapState.longitude,
            zoom: newMapState.zoom
        }));

        // Actually move the map to the new position
        if (mapRef.current) {
            mapRef.current.setView([newMapState.latitude, newMapState.longitude], newMapState.zoom);
        }
    }

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <MarkerPopup>
                <div><strong>Lat:</strong> {mapState.latitude?.toFixed(6)}</div>
                <div><strong>Lng:</strong> {mapState.longitude?.toFixed(6)}</div>
                <div><strong>Zoom:</strong> {mapState.zoom}</div>
                <div><strong>Qtd:</strong>{affiti.length}</div>
                <div>
                    <span onClick={() => changeMap(defaultMapStateExport)}>Udine</span>
                    <span onClick={() => changeMap(triesteMapStateExport)}>Trieste</span>
                </div>
            </MarkerPopup>
            <MapContainer center={[mapState.latitude, mapState.longitude]} zoom={mapState.zoom} style={{ height: "calc(100% - 65px)", width: "100%" }}>
                <MapEventHandler />
                <MapPositionUpdater mapRef={mapRef} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {affitiInMap}
            </MapContainer>
        </div>
    );
}
