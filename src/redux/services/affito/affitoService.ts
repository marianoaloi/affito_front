import { AffitoEntity } from "@/app/entity/AffitoEntity";
import { FilterAffito } from "../filter/filterTypes";

const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://us-central1-affitiudine.cloudfunctions.net/api' : 'http://localhost:5000';
// 'https://us-central1-affitiudine.cloudfunctions.net/api';
console.log(process.env.NODE_ENV)

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

const setAffitoState = async (realEstateId: string | number, newState: number, token: string | undefined): Promise<returnAffitoState> => {
    const response = await fetch(`${API_BASE_URL}/api/affito/${realEstateId}/state`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
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