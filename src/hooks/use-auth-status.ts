import { useState, useEffect } from 'react';
import { checkToken } from '@/utils/auth';

export function useAuthStatus(): boolean | null {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        let isMounted = true;

        const verifyAuth = async () => {
            try {
                const isValid = await checkToken();
                if (isMounted) {
                    setIsAuthenticated(isValid);
                }
            } catch (error) {
                console.error("Authentication check failed:", error);
                if (isMounted) {
                    setIsAuthenticated(false);
                }
            }
        };

        verifyAuth();
        return () => {
            isMounted = false;
        };
    }, []);

    return isAuthenticated;
}