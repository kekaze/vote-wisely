import { get } from "http";

const isAuthenticated = () => {
    const token = getAuthToken();
    if (!token) {
        return false;
    }
    return true;
};

const getAuthToken = () => {
    const match = document.cookie.match(/(^| )auth_token=([^;]+)/);
    return match ? match[1] : null;
};

export { isAuthenticated };