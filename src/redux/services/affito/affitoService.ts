import { AffitoEntity } from "@/app/entity/AffitoEntity";
import { FilterAffito } from "../filter/filterTypes";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://us-central1-affitiudine.cloudfunctions.net/api';

const getAffiti =
    async (filter?: FilterAffito): Promise<AffitoEntity[]> => {
        const response = await fetch(`${API_BASE_URL}/api/affito`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filter || {}),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch affito data');
        }
        const data = await response.json();
        return data.data;
    }

export type returnAffitoState = {
    success: boolean;
    message: string;
}

const setAffitoState = async (realEstateId: string | number, newState: number): Promise<returnAffitoState> => {
    const response = await fetch(`${API_BASE_URL}/api/affito/${realEstateId}/state`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stateMaloi: newState }),
    });
    if (!response.ok) {
        throw new Error('Failed to update affito state');
    }
    return response.json();
};

export { setAffitoState };
export default getAffiti;