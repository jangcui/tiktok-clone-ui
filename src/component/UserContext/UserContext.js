import { useContext } from 'react';
import { ContextUser } from '~/store/Contexts';

function UserContext() {
    const user = useContext(ContextUser);
    return user;
}

export default UserContext;
