import { AffitoEntity } from "@/app/entity/AffitoEntity"
import { affitoActions, affitoSelectors, selectAllAffito, useSelector } from "@/redux"



export default function AffitoList() {
    const affito = useSelector(selectAllAffito)
    console.log(affito)

    return (
       <>
       {affito ? affito.map((affito: AffitoEntity) => (
        <div key={affito._id}>
            <h1>{affito.realEstate.title}</h1>
        </div>
       ))
    
    : <div>Nessun affito trovato</div>}
       </>
    )
}