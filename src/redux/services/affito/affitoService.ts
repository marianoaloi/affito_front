import { AffitoEntity } from "@/app/entity/AffitoEntity";
import { FilterAffito } from "../filter/filterTypes";
import { ProvinceCountList } from "@/app/entity/CountEntity";

const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://us-central1-affitiudine.cloudfunctions.net/api' : 'http://localhost:5088';
// 'https://us-central1-affitiudine.cloudfunctions.net/api';
console.log(process.env.NODE_ENV)

function wait(delay : number) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

function fetchRetry(url:string, delay : number, tries : number, fetchOptions = {}) {
    const onError = (err: any): Promise<Response> => {
        const triesLeft = tries - 1;
        if (!triesLeft) {
            throw err;
        }
        return wait(delay).then(() => fetchRetry(url, delay, triesLeft, fetchOptions));
    }

    const errorIn404 = (response: Response): Response => {
        if (response.status === 404) {  
            throw new Error(`404 Not Found: ${url}`);
        }
        return response;
    }
    return fetch(url,fetchOptions).then(errorIn404).catch(onError);
}

const getAffiti =
    async (filter?: FilterAffito): Promise<AffitoEntity[]> => {
        const response = await fetchRetry(`${API_BASE_URL}/api/affito`,10_000,5, {
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

const count = 
    async(): Promise<ProvinceCountList> => {
        const response = await fetchRetry(`${API_BASE_URL}/api/count`,10_000,5, {
            method: 'GET',
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

export { setAffitoState , count};
export default getAffiti;