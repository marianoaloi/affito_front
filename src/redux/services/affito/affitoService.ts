const getAffiti =
    async () => {
        const response = await fetch('http://localhost:5000/api/affito');
        if (!response.ok) {
            throw new Error('Failed to fetch affito data');
        }
        const data = await response.json();
        return data;
    }
export default getAffiti;