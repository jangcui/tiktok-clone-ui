import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import {
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
    HomeIcon,
    HomeActiveIcon,
} from '~/component/Icons';

import SuggestAccounts from '~/component/SuggestAccounts';
import * as Services from '~/Services/Services';
import styles from './Sidebar.module.scss';
import config from '~/config';
import Menu, { MenuItems } from './Menu';

const cx = classNames.bind(styles);
const PER_PAGE = 5;

function Sidebar() {
    const [suggestedUser, setSuggestedUser] = useState([]);

    useEffect(() => {
        Services.getSuggested({ page: 2, perPage: PER_PAGE })
            .then((data) => {
                setSuggestedUser((preUser) => [...preUser, ...data]);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItems
                    title="For You"
                    to={config.routes.home}
                    icon={<HomeIcon />}
                    activeIcon={<HomeActiveIcon />}
                />
                <MenuItems
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItems title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />

                <SuggestAccounts label="suggested accounts" data={suggestedUser} />
                <SuggestAccounts label="following accounts" />
            </Menu>
        </aside>
    );
}

export default Sidebar;
