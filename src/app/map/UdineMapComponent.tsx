"use client";
import { ReactNode, useEffect, useState, useRef, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import L, { icon } from "leaflet";
import { PhotoPreview, PhotoPreviewOverlay } from "./UdineMapComponent.styled";
import FilterMap from "./filterMap";
import { selectAllAffito, useSelector, useDispatch, mapActions, selectMapPosition, getFilter, FilterAffito, setFilterAffito, setManyAffitoState, updateManyAffitoState } from "@/redux";
import AffitoErrorSnackbar from "../component/AffitoErrorSnackbar";
import { AffitoEntity } from "../entity/AffitoEntity";
import PopupContent from "./PopupMapComponent";
import { useAuth } from "../menu/AuthContext";
import { filterResidencesByFilter } from "../util/filterAffitti";


function MapEventHandler() {
    const dispatch = useDispatch();
    const saveMap = (map: L.Map) => {
        const center = map.getCenter() || { lat: 0, lng: 0 };
        const zoom = map.getZoom();
        dispatch(mapActions.setMapPosition({
            latitude: center.lat,
            longitude: center.lng,
            zoom: zoom
        }));
    }
    const map = useMapEvents({
        moveend: () => saveMap(map),
        zoomend: () => saveMap(map)
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
    onMouseLeave: () => void,
    handleMouseLeave: () => void
): ReactNode {
    const propt = affito.realEstate.properties;
    if (!propt) {
        console.log(affito.realEstate.title)
        return null;
    }
    const { latitude, longitude } = propt.location;
    if (!latitude || !longitude) {
        console.log(`The affito ${affito.realEstate.title} has no location. Fint the ID to see the problem ${affito._id}}`)
        return null;
    }

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
                    closePopup={handleMouseLeave}
                />
            </Popup>
        </Marker>
    );
}




export default function UdineMapComponent() {


    const dispatch = useDispatch();
    const mapRef = useRef<L.Map | null>(null);

    const filter = useSelector(getFilter) as FilterAffito;
    
    const allAffiti = useSelector(selectAllAffito);
    const affiti = useMemo(() => allAffiti.filter(a => filterResidencesByFilter(a, filter)), [allAffiti, filter]);
    const mapState = useSelector(selectMapPosition);
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

    const { getAuthToken, user } = useAuth();
    const rejectAll = () => {
        if (!window.confirm(`Are you sure to update the state of ${affiti.length} affiti?`)) {
            return;
        }

        try {
            getAuthToken().then(token => {
                if (!token) {
                    throw new Error("Token empty")
                    return
                }
                dispatch(updateManyAffitoState({ realEstateIds: affiti
                    .filter(af => af.stateMaloi !== 0)
                    .map(af => af._id), newState: 0, token }))

            })
        } catch (err) {
            // Optionally handle error
            throw new Error('Failed to update state:' + (err instanceof Error ? err.message : 'Unknown error'));
        }
    }
    let errorPossition = 0
    useEffect(() => {
        const affitiAux = affiti.filter(af => {
            const propt = af.realEstate?.properties.location
            return propt && propt.latitude && propt.longitude
        })
            .map((affito) => affitoDataBase(affito, handleMouseEnter, handleMouseLeave, handleMouseLeave));
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
            errorPossition = 0
        }
        const possitionError = (err: GeolocationPositionError) => {
            errorPossition++
            console.error(err)
            setAffitiInMap(affitiAux)
        }
        if (errorPossition < 20)
            navigator.geolocation.getCurrentPosition(possitionOk, possitionError)
        else
            setAffitiInMap(affitiAux)

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

    }, [affiti]);


    const changeMap = useCallback((newMapState: { latitude: number; longitude: number; zoom: number; local: string }) => {
        dispatch(mapActions.setMapPosition({
            latitude: newMapState.latitude,
            longitude: newMapState.longitude,
            zoom: newMapState.zoom
        }));
        dispatch(setFilterAffito({ ...filter, "province": newMapState.local as "Udine" | "Trieste" | undefined }));
        if (mapRef.current) {
            mapRef.current.setView([newMapState.latitude, newMapState.longitude], newMapState.zoom);
        }
    }, [dispatch, filter, mapRef]);

    const changeFilterStatus = useCallback((field: string, value: 0 | 1 | 2 | -1 | undefined | string): void => {
        dispatch(setFilterAffito({ ...filter, [field]: value }));
    }, [dispatch, filter]);



    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <AffitoErrorSnackbar />
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
            <FilterMap
                affiti={affiti}
                filter={filter}
                changeFilterStatus={changeFilterStatus}
                changeMap={changeMap}
                rejectAll={rejectAll}
            />
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
