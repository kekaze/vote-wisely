export const getResult = async (reference: string) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/Results/${reference}`, {
        method: 'GET',
        credentials: 'include' as RequestCredentials,
    });
    if (!response.ok) {
        throw new Error('Failed to fetch result');
    }
    return await response.json();
};

