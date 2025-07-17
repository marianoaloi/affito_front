import { AffitoEntity } from "@/app/entity/AffitoEntity";


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const getAffiti =
    async (): Promise<AffitoEntity[]> => {
        const response = await fetch(`${API_BASE_URL}/api/affito`);
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