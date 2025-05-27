import { useState, useEffect } from 'react';
import { onChangeUser } from '../firebase/auth';

const useUser = () => {
    const [user, setUser] = useState({});
    
    useEffect(() => {
        onChangeUser(setUser);
    }, []);

    return user;
};

export default useUser;