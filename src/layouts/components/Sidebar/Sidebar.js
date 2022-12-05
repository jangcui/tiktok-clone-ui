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

function Sidebar({ small = false }) {
    const user = UserContext();
    const [page, setPage] = useState(Math.floor(Math.random() * 20 + 1)); ///====> vì api chỉ có tất cả 20 trang thui
    const [isSeeAll, setIsSeeAll] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        if (page > 20) {
            return setPage(1);
        }
        Services.getSuggested({ page: page, perPage: 10 })
            .then((data) => {
                if (data < 10) {
                    setPage(page + 1);
                    console.log(page);
                } else {
                    setDataUser((preUser) => [...preUser, ...data]);
                }
            })
            .catch((error) => console.log(error));
    }, [page]);
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
                        <p className={cx('btn-title')}>Log in to follow creators, like videos, and view comments.</p>
                        <Button large outline onClick={() => setOpenModal(true)}>
                            <b> Log in</b>
                        </Button>
                    </div>
                )}
                <SuggestAccounts label="suggested accounts" data={isSeeAll ? dataUser.slice(0, 5) : dataUser} />
                {isSeeAll ? (
                    <p className={cx('more-btn')} onClick={() => setIsSeeAll(!isSeeAll)}>
                        See all
                    </p>
                ) : (
                    <p className={cx('more-btn')} onClick={() => setIsSeeAll(!isSeeAll)}>
                        See less
                    </p>
                )}
                <SuggestAccounts label="following accounts" data={dataUser} />

                <DiscoverSidebar />

                <FooterSidebar />
            </Menu>
        </aside>
    );
}

export default Sidebar;
