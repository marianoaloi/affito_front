"use client";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { QtdMap, LuogoMap, MarkerPopup } from "./UdineMapComponent.styled";
import { FilterAffito, useSelector } from "@/redux";
import { AffitoEntity } from "../entity/AffitoEntity";
import { defaultMapStateExport, triesteMapStateExport } from "@/redux/services/map/mapSlice";

interface FilterMapProps {
    affiti: AffitoEntity[];
    filter: FilterAffito;
    changeFilterStatus: (field: string, value: 0 | 1 | 2 | -1 | undefined | string) => void;
    changeMap: (newMapState: { latitude: number; longitude: number; zoom: number; local: string }) => void;
    rejectAll: () => void;

}

export default function FilterMap({ affiti, filter, changeFilterStatus, changeMap , rejectAll }: FilterMapProps) {
    const [open, setOpen] = useState(true);
    const elevatorCount = affiti.map(a => a.realEstate?.properties?.mainFeatures?.find(f => f.type === "elevator")?.compactLabel);

    const counters = useSelector(state => state.counter).data;


    const addBoardSelect = (field: any, value: any) => {
        return field == value ? "borderSelected" : ""
    }

    return (
        <MarkerPopup>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div>
                    {counters.filter(count => count._id.province === filter.province && count._id.type === filter.type).map(counter => (
                        <QtdMap key={counter._id.province + counter._id.type}>
                            <strong>{counter._id.type === 'a' ? 'Affito' : 'Compra'} in {counter._id.province} : </strong>
                            <span>{counter.total} </span>
                            <span style={{ backgroundColor: "#ffffff", color: "black", border: "1px solid black" }} >♿ {counter.disable} </span>
                            <span style={{ backgroundColor: "#1976d2" }}>{counter.emptyChoise}</span>
                        </QtdMap>
                    ))}
                </div>
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
                        <span className={addBoardSelect(filter.elevator, undefined)} onClick={() => changeFilterStatus("elevator", undefined)}>{affiti.length}</span>
                        <span className={addBoardSelect(filter.elevator, "No")} onClick={() => changeFilterStatus("elevator", "No")}>{elevatorCount.filter(a => a == "No").length}</span>
                        <span className={addBoardSelect(filter.elevator, "Sì")} onClick={() => changeFilterStatus("elevator", "Sì")}>{elevatorCount.filter(a => a == "Sì").length}</span>
                        <span className={addBoardSelect(filter.elevator, "empty")} onClick={() => changeFilterStatus("elevator", "empty")}>{elevatorCount.filter(a => !a).length}</span>
                    </QtdMap>
                    <QtdMap>
                        <strong>Accept:</strong>
                        <span className={addBoardSelect(filter.stateMaloi, undefined)} onClick={() => changeFilterStatus("stateMaloi", undefined)}>{affiti.length}</span>
                        <span className={addBoardSelect(filter.stateMaloi, 0)} onClick={() => changeFilterStatus("stateMaloi", 0)}>{affiti.filter(a => a.stateMaloi == 0).length}</span>
                        <span className={addBoardSelect(filter.stateMaloi, 1)} onClick={() => changeFilterStatus("stateMaloi", 1)}>{affiti.filter(a => a.stateMaloi == 1).length}</span>
                        <span className={addBoardSelect(filter.stateMaloi, -1)} onClick={() => changeFilterStatus("stateMaloi", -1)}>{affiti.filter(a => undefined == a.stateMaloi).length}</span>

                    </QtdMap>
                    <QtdMap>
                        <strong>Accebilità:</strong>
                        <div>
                            <span className={addBoardSelect(filter.accessoDisabili, undefined)} onClick={() => changeFilterStatus("accessoDisabili", undefined)}>⚫️</span>
                            <span className={addBoardSelect(filter.accessoDisabili, 0)} onClick={() => changeFilterStatus("accessoDisabili", 0)}>❌</span>
                            <span className={addBoardSelect(filter.accessoDisabili, 1)} onClick={() => changeFilterStatus("accessoDisabili", 1)}>♿</span>
                            <span className={addBoardSelect(filter.accessoDisabili, -1)} onClick={() => changeFilterStatus("accessoDisabili", -1)}>🟡</span>
                        </div>
                    </QtdMap>
                    <LuogoMap>
                        <span className={addBoardSelect(filter.province, "Udine")} onClick={() => changeMap(defaultMapStateExport)}>Udine</span>
                        <span className={addBoardSelect(filter.province, "Trieste")} onClick={() => changeMap(triesteMapStateExport)}>Trieste</span>

                    </LuogoMap>
                    <LuogoMap>
                        <span className={addBoardSelect(filter.type, "a")} onClick={() => changeFilterStatus("type", 'a')}>Affito</span>
                        <span className={addBoardSelect(filter.type, "c")} onClick={() => changeFilterStatus("type", 'c')}>Compra</span>

                    </LuogoMap>
                    <LuogoMap>
                    <span style={{
                        color: "black", 
                        background: "red", 
                        border: "solid black", 
                        
                    }} onClick={rejectAll}>Reject All</span>
                    </LuogoMap>
                </>
            )}
        </MarkerPopup>
    );
}
