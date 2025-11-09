import { AffitoEntity } from "@/app/entity/AffitoEntity";

const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://us-central1-affitiudine.cloudfunctions.net/api' : 'http://localhost:5088';

function wait(delay: number) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

function fetchRetry(url: string, delay: number, tries: number, fetchOptions = {}) {
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
    return fetch(url, fetchOptions).then(errorIn404).catch(onError);
}

const getStatistics =
    async (): Promise<AffitoEntity[]> => {
        const response = await fetchRetry(`${API_BASE_URL}/statistic/affiti`, 10_000, 5, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch statistics data');
        }
        const data = await response.json();
        return data;
    }

export default getStatistics;
