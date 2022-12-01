import { useState } from 'react';
import Context from './Context';

const user_login = JSON.parse(localStorage.getItem('USER_LOGIN')) || null;
function Provider({ children }) {
    const [userLogin, setUserLogin] = useState(user_login);

    return <Context.Provider value={userLogin}>{children}</Context.Provider>;
}

export default Provider;
