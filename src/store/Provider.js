import { useState } from 'react';
import { ContextUser, ContextVolume } from './Contexts';

const user_login = JSON.parse(localStorage.getItem('USER_LOGIN')) || null;
function Provider({ children }) {
    const [volume, setVolume] = useState(localStorage.getItem('VOLUME') || 0);

    return (
        <ContextVolume.Provider value={{ volume, setVolume }}>
            <ContextUser.Provider value={user_login}>{children}</ContextUser.Provider>
        </ContextVolume.Provider>
    );
}

export default Provider;
