import { useContext } from 'react';
import { StoreContext } from '~/store';

function UserContext() {
    const user = useContext(StoreContext);
    return user;
}

export default UserContext;
