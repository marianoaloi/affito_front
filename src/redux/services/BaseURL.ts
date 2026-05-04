export const API_BASE_URL = 
process.env.NODE_ENV === 'production' ? 
        'https://us-central1-affitiudine.cloudfunctions.net/api' 
        :  
        `http://${typeof window !== 'undefined' ? window.location.hostname || "localhost" : "localhost"}:5088`;