import { AffitoEntity } from "@/app/entity/AffitoEntity";
import { FilterAffito } from "../filter/filterTypes";
import { API_BASE_URL } from "../BaseURL";


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

export type returnAffitoState = {
    success: boolean;
    message: string;
}

const setManyAffitoState = async (realEstateIds: number[], newState: number, token: string | undefined): Promise<{ids:number[],state:number}> => {
    const responses = await fetchRetry(`${API_BASE_URL}/api/affito/bulk/state`,10_000,5, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ realEstateIds: realEstateIds, stateMaloi: newState }),
    });
    if (!responses.ok) {
        throw new Error('Failed to update affito state');
    }
    const data = await responses.json();
    if(data.data.modifiedCount > 0)
        return {ids:realEstateIds,state:newState}
    else{
        throw new Error('Failed to update affito state');
    }
    
};


const setAffitoState = async (realEstateId: string | number, newState: number, token: string | undefined): Promise<returnAffitoState> => {
    const response = await fetchRetry(`${API_BASE_URL}/api/affito/${realEstateId}/state`,10_000,5, {
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

export type returnAffitoDescription = {
    success: boolean;
    message: string;
}

const setDescription = async (realEstateId: string | number, description: string , token:string | undefined): Promise<returnAffitoDescription> => {
    const response = await fetch(`${API_BASE_URL}/api/affito/${realEstateId}/setDescription`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ description: description }),
    });
    if (!response.ok) {
        throw new Error('Failed to update affito description');
    }
    return response.json();
};

export { setAffitoState , setDescription , setManyAffitoState , getAffiti};
export default getAffiti;