import { FilterAffito } from "@/redux";
import { AffitoEntity } from "../entity/AffitoEntity";

export const filterResidencesByFilter = (affito: AffitoEntity, filter: FilterAffito): boolean => {
    const propt = affito.realEstate?.properties;
    const mainFeature = propt?.mainFeatures;

    return (
        (filter.stateMaloi === undefined || (filter.stateMaloi === -1 && affito.stateMaloi === undefined) || affito.stateMaloi === filter.stateMaloi)
        &&
        (filter.elevator === undefined || (filter.elevator === "empty" && !mainFeature?.find(f => f.type === "elevator")) || filter.elevator === mainFeature?.find(f => f.type === "elevator")?.compactLabel)
        &&
        (filter.accessoDisabili === undefined || (filter.accessoDisabili === -1 && propt?.primaryFeatures?.find(f => f.name === "Accesso per disabili")?.value === undefined) || filter.accessoDisabili === propt?.primaryFeatures?.find(f => f.name === "Accesso per disabili")?.value)
        &&
        (filter.floor === undefined || (filter.floor === "Terra" && propt?.floor?.abbreviation?.toUpperCase().includes("T")) || (filter.floor === "Mezzo" && !propt?.floor?.abbreviation?.toUpperCase().includes("T")))
    );
};
