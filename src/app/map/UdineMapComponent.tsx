"use client";
import { ReactNode, useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import L, { icon } from "leaflet";
import { MarkerPopup, PhotoPreview, PhotoPreviewOverlay, LuogoMap, QtdMap } from "./UdineMapComponent.styled";
import { selectAllAffito, useSelector, useDispatch, mapActions, selectMapPosition, getFilter, FilterAffito, setFilterAffito } from "@/redux";
import { AffitoEntity } from "../entity/AffitoEntity";
import './UdineMapComponent.css'
import { defaultMapStateExport, triesteMapStateExport } from "@/redux/services/map/mapSlice";
import PopupContent from "./PopupMapComponent";


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



function affitoDataBase(
    affito: AffitoEntity,
    onMouseEnter: (photoUrl: string, event: React.MouseEvent<HTMLImageElement>) => void,
    onMouseLeave: () => void
): ReactNode {
    const propt = affito.realEstate.properties;
    const { latitude, longitude } = propt.location;
    return (
        <Marker key={affito._id}
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
                <PopupContent
                    affito={affito}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />
            </Popup>
        </Marker>
    );
}


export default function UdineMapComponent() {


    const dispatch = useDispatch();
    const mapRef = useRef<L.Map | null>(null);

    const affiti = useSelector(selectAllAffito);
    const mapState = useSelector(selectMapPosition);
    const filter = useSelector(getFilter) as FilterAffito;
    const [affitiInMap, setAffitiInMap] = useState<ReactNode[]>([]);
    const [hoveredPhoto, setHoveredPhoto] = useState<{ url: string; x: number; y: number } | null>(null);

    const handleMouseEnter = (photoUrl: string, event: React.MouseEvent<HTMLImageElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setHoveredPhoto({
            url: photoUrl,
            x: rect.right + 10,
            y: rect.top
        });
    };

    const handleMouseLeave = () => {
        setHoveredPhoto(null);
    };

    useEffect(() => {
        const affitiAux = affiti.map((affito) => affitoDataBase(affito, handleMouseEnter, handleMouseLeave));
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
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);


    const changeMap = (newMapState: { latitude: number; longitude: number; zoom: number; local: string }) => {
        dispatch(mapActions.setMapPosition({
            latitude: newMapState.latitude,
            longitude: newMapState.longitude,
            zoom: newMapState.zoom
        }));

        dispatch(setFilterAffito({ ...filter, "province": newMapState.local as "Udine" | "Trieste" | undefined }));

        // Actually move the map to the new position
        if (mapRef.current) {
            mapRef.current.setView([newMapState.latitude, newMapState.longitude], newMapState.zoom);
        }
    }

    function changeFilterStatus(field: string, value: 0 | 1 | 2 | -1 | undefined | string): void {
        // Accept undefined to indicate "no state filter" (show all)
        // Placeholder implementation — replace with real filter logic as needed
        // For now just log the requested filter value
        // eslint-disable-next-line no-console
        dispatch(setFilterAffito({ ...filter, [field]: value }));
    }

    const elevatorCount = affiti.map(a => a.realEstate?.properties?.mainFeatures.find(f => f.type == 'elevator')?.compactLabel)

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            {hoveredPhoto && (
                <PhotoPreviewOverlay
                    style={{
                        left: `${hoveredPhoto.x}px`,
                        top: `${hoveredPhoto.y}px`,
                    }}
                >
                    <PhotoPreview src={hoveredPhoto.url} alt="Enlarged preview" />
                </PhotoPreviewOverlay>
            )}
            <MarkerPopup>
                {/* <div><strong>Lat:</strong> {mapState.latitude?.toFixed(6)}</div>
                <div><strong>Lng:</strong> {mapState.longitude?.toFixed(6)}</div>
                <div><strong>Zoom:</strong> {mapState.zoom}</div> */}
                <QtdMap>
                    <strong>Elevator:</strong>
                    <span className={filter.elevator == undefined ? "borderSelected" : ""} onClick={() => changeFilterStatus("elevator", undefined)}>{affiti.length}</span>
                    <span className={filter.elevator == "No" ? "borderSelected" : ""} onClick={() => changeFilterStatus("elevator", "No")}>{elevatorCount.filter(a => a == "No").length}</span>
                    <span className={filter.elevator == "Sì" ? "borderSelected" : ""} onClick={() => changeFilterStatus("elevator", "Sì")}>{elevatorCount.filter(a => a == "Sì").length}</span>
                    <span className={filter.elevator == "empty" ? "borderSelected" : ""} onClick={() => changeFilterStatus("elevator", "empty")}>{elevatorCount.filter(a => !a).length}</span>
                </QtdMap>
                <QtdMap>
                    <strong>Qtd:</strong>
                    <span className={filter.stateMaloi == undefined ? "borderSelected" : ""} onClick={() => changeFilterStatus("stateMaloi", undefined)}>{affiti.length}</span>
                    <span className={filter.stateMaloi == 0 ? "borderSelected" : ""} onClick={() => changeFilterStatus("stateMaloi", 0)}>{affiti.filter(a => a.stateMaloi == 0).length}</span>
                    <span className={filter.stateMaloi == 1 ? "borderSelected" : ""} onClick={() => changeFilterStatus("stateMaloi", 1)}>{affiti.filter(a => a.stateMaloi == 1).length}</span>
                    <span className={filter.stateMaloi == -1 ? "borderSelected" : ""} onClick={() => changeFilterStatus("stateMaloi", -1)}>{affiti.filter(a => undefined == a.stateMaloi).length}</span>
                </QtdMap>
                <LuogoMap>
                    <span className={filter.province == 'Udine' ? "borderSelected" : ""} onClick={() => changeMap(defaultMapStateExport)}>Udine</span>
                    <span className={filter.province == 'Trieste' ? "borderSelected" : ""} onClick={() => changeMap(triesteMapStateExport)}>Trieste</span>
                </LuogoMap>
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
