import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import {
    HomeActiveIcon,
    HomeIcon,
    LiveActiveIcon,
    LiveIcon,
    UserGroupActiveIcon,
    UserGroupIcon,
} from '~/component/Icons';

import Button from '~/component/Button';
import ModalAuth from '~/component/ModalAuth';
import SuggestAccounts from '~/component/SuggestAccounts';
import UserContext from '~/component/UserContext';
import config from '~/config';
import * as Services from '~/Services/Services';
import DiscoverSidebar from './DiscoverSidebar';
import FooterSidebar from './FooterSidebar';
import Menu, { MenuItems } from './Menu';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const RANDOM = () => Math.floor(Math.random() * 20 + 1); ///====> vì api chỉ có tất cả 20 trang thui

function Sidebar({ small = false }) {
    const user = UserContext();
    const [page, setPage] = useState(RANDOM);
    const [isSeeAll, setIsSeeAll] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [dataUser, setDataUser] = useState([]);
    const [dataFollow, setDataFollow] = useState([]);

    useEffect(() => {
        if (page > 20) {
            return setPage(Math.floor(Math.random() * 20 + 1));
        }
        Services.getSuggested({ page: page, perPage: 10 })
            .then((data) => {
                // if (data < 10) {
                //     setPage(page + 1);
                // } else {
                setDataUser((preUser) => [...preUser, ...data]);
                // }
            })
            .catch((error) => console.log(error));
    }, [page]);

    useEffect(() => {
        Services.getFollowList(1)
            .then((data) => {
                if (data) {
                    setDataFollow((preUser) => [...preUser, ...data]);
                }
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
                        <p className={cx('btn-title')}>Log in to follow creators, like videos, and view comments.</p>
                        <Button large outline onClick={() => setOpenModal(true)}>
                            <b> Log in</b>
                        </Button>
                    </div>
                )}
                <SuggestAccounts
                    isFollowed={false}
                    label="Suggested accounts"
                    // data={isSeeAll ? dataUser.slice(0, 5) : dataUser}
                    data={dataUser}
                />
                <p className={cx('more-btn')} onClick={() => setIsSeeAll(!isSeeAll)}>
                    {isSeeAll ? ' See all' : 'See less'}
                </p>

                {user && <SuggestAccounts isFollowed={false} label="Following accounts" data={dataFollow} />}
                <DiscoverSidebar />

                <FooterSidebar />
            </Menu>
        </aside>
    );
}

export default Sidebar;
