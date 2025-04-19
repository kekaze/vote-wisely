import { get } from "http";

const checkToken = async () => {
    if (import.meta.env.VITE_IS_DEV == 'TRUE') {
        console.log("DEV MODE");
        return true;
    }

    const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/Auth/CheckAuth`, {
        method: 'GET',
        credentials: 'include' as RequestCredentials,
    });

    if (!response.ok) {
        return false;
    };

    return true;
};

export { checkToken };