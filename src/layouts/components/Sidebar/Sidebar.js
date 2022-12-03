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
import Button from '~/component/Button';
import UserContext from '~/component/UserContext';
import ModalAuth from '~/component/ModalAuth';
import FooterSidebar from './FooterSidebar';
import DiscoverSidebar from './DiscoverSidebar';

const cx = classNames.bind(styles);
const PER_PAGE = 5;

function Sidebar({ small = false }) {
    const user = UserContext();

    const [openModal, setOpenModal] = useState(false);
    const [suggestedUser, setSuggestedUser] = useState([]);

    useEffect(() => {
        Services.getSuggested({ page: 2, perPage: PER_PAGE })
            .then((data) => {
                setSuggestedUser((preUser) => [...preUser, ...data]);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <aside className={cx('wrapper', small && 'small')}>
            <ModalAuth isOpen={openModal} onClose={() => setOpenModal(false)} />
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
                {!!!user && (
                    <div className={cx('btn-login')}>
                        <p className={cx('btn-title')}>
                            Đăng nhập để follow các tác giả, thích video và xem bình luận.
                        </p>
                        <Button large outline onClick={() => setOpenModal(true)}>
                            <b> Log in</b>
                        </Button>
                    </div>
                )}
                <SuggestAccounts label="suggested accounts" data={suggestedUser} />

                <SuggestAccounts label="following accounts" data={suggestedUser} />

                <DiscoverSidebar />

                <FooterSidebar />
            </Menu>
        </aside>
    );
}

export default Sidebar;
