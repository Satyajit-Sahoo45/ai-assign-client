import { useEffect, useState } from 'react';

const SessionProvider = () => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const user = localStorage.getItem('user');

        if (token && user) {
            setCurrentUser(JSON.parse(user));
        }
        setLoading(false);
    }, []);

    return { currentUser, loading };
};

export default SessionProvider;
