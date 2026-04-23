"use client";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { QtdMap, LuogoMap, MarkerPopup } from "./UdineMapComponent.styled";
import { FilterAffito } from "@/redux";
import { AffitoEntity } from "../entity/AffitoEntity";
import { defaultMapStateExport, triesteMapStateExport } from "@/redux/services/map/mapSlice";

interface FilterMapProps {
    affiti: AffitoEntity[];
    filter: FilterAffito;
    changeFilterStatus: (field: string, value: 0 | 1 | 2 | -1 | undefined | string) => void;
    changeMap: (newMapState: { latitude: number; longitude: number; zoom: number; local: string }) => void;
}

export default function FilterMap({ affiti, filter, changeFilterStatus, changeMap }: FilterMapProps) {
    const [open, setOpen] = useState(false);
    const elevatorCount = affiti.map(a => a.realEstate?.properties?.mainFeatures?.find(f => f.type === "elevator")?.compactLabel);

    return (
        <MarkerPopup>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <MenuIcon
                    onClick={() => setOpen(prev => !prev)}
                    style={{ cursor: "pointer", fontSize: 20 }}
                    titleAccess="Toggle filters"
                />
            </div>
            {open && (
                <>
                    <QtdMap>
                        <strong>Terra</strong>
                        <input type="checkbox" checked={filter.floor === "Terra"} onChange={(ev) => changeFilterStatus("floor", ev.target.checked ? "Terra" : undefined)} />
                    </QtdMap>
                    <QtdMap>
                        <strong>Elevator:</strong>
                        <span className={filter.elevator == undefined ? "borderSelected" : ""} onClick={() => changeFilterStatus("elevator", undefined)}>{affiti.length}</span>
                        <span className={filter.elevator == "No" ? "borderSelected" : ""} onClick={() => changeFilterStatus("elevator", "No")}>{elevatorCount.filter(a => a == "No").length}</span>
                        <span className={filter.elevator == "Sì" ? "borderSelected" : ""} onClick={() => changeFilterStatus("elevator", "Sì")}>{elevatorCount.filter(a => a == "Sì").length}</span>
                        <span className={filter.elevator == "empty" ? "borderSelected" : ""} onClick={() => changeFilterStatus("elevator", "empty")}>{elevatorCount.filter(a => !a).length}</span>
                    </QtdMap>
                    <QtdMap>
                        <strong>Accept:</strong>
                        <span className={filter.stateMaloi == undefined ? "borderSelected" : ""} onClick={() => changeFilterStatus("stateMaloi", undefined)}>{affiti.length}</span>
                        <span className={filter.stateMaloi == 0 ? "borderSelected" : ""} onClick={() => changeFilterStatus("stateMaloi", 0)}>{affiti.filter(a => a.stateMaloi == 0).length}</span>
                        <span className={filter.stateMaloi == 1 ? "borderSelected" : ""} onClick={() => changeFilterStatus("stateMaloi", 1)}>{affiti.filter(a => a.stateMaloi == 1).length}</span>
                        <span className={filter.stateMaloi == -1 ? "borderSelected" : ""} onClick={() => changeFilterStatus("stateMaloi", -1)}>{affiti.filter(a => undefined == a.stateMaloi).length}</span>

                    </QtdMap>
                    <QtdMap>
                        <strong>Accebilità:</strong>
                        <div>
                            <span className={filter.accessoDisabili == undefined ? "borderSelected" : ""} onClick={() => changeFilterStatus("accessoDisabili", undefined)}>⚫️</span>
                            <span className={filter.accessoDisabili == 0 ? "borderSelected" : ""} onClick={() => changeFilterStatus("accessoDisabili", 0)}>❌</span>
                            <span className={filter.accessoDisabili == 1 ? "borderSelected" : ""} onClick={() => changeFilterStatus("accessoDisabili", 1)}>♿</span>
                            <span className={filter.accessoDisabili == -1 ? "borderSelected" : ""} onClick={() => changeFilterStatus("accessoDisabili", -1)}>🟡</span>
                        </div>
                    </QtdMap>
                    <LuogoMap>
                        <span className={filter.province == "Udine" ? "borderSelected" : ""} onClick={() => changeMap(defaultMapStateExport)}>Udine</span>
                        <span className={filter.province == "Trieste" ? "borderSelected" : ""} onClick={() => changeMap(triesteMapStateExport)}>Trieste</span>
                        
                    </LuogoMap>
                    <LuogoMap>
                        <span className={filter.type == "a" ? "borderSelected" : ""} onClick={() => changeFilterStatus("type", 'a')}>Affito</span>
                        <span className={filter.type == "c" ? "borderSelected" : ""} onClick={() => changeFilterStatus("type", 'c')}>Compra</span>
                        
                    </LuogoMap>
                </>
            )}
        </MarkerPopup>
    );
}
