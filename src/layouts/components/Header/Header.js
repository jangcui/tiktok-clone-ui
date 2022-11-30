import Menu from '~/component/Popper/Menu';
import className from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

import images from '~/asset/Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faEarthAsia,
    faEllipsisVertical,
    faKeyboard,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';

import Button from '~/component/Button';
import { MessageIcon, UploadIcon } from '~/component/Icons';
import Image from '~/component/Image';
import Search from '../Search';

const cx = className.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'keyboard shortcuts',
    },
];
const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'View profile',
        to: '/@profile',
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Get Coins',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Setting',
        to: '/setting',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Log out',
        to: '/logout',
        separate: true,
    },
];

function Header() {
    const currentUser = true;

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img src={images.logo} alt="logo-tiktok" />
                    </Link>
                </div>

                <Search />
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Button normal className={cx('plus-upload')}>
                                <FontAwesomeIcon icon={faPlus} />
                                Up Load
                            </Button>
                            <Tippy content="Message" placement="bottom" delay={[0, 200]}>
                                <button className={cx('btn-actions')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>

                            <Tippy content="Box" placement="bottom" delay={[0, 200]}>
                                <button className={cx('btn-actions')}>
                                    <span className={cx('notify')}>12</span>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Up Load</Button>
                            <Button primary>Log ddin</Button>
                        </>
                    )}
                    <Menu
                        menuUser
                        interactive
                        items={currentUser ? userMenu : MENU_ITEMS}
                        onChange={handleMenuChange}
                        delay={[0, 700]}
                        offset={[12, 8]}
                        placement="bottom-end"
                    >
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/1278fdc7ca7d4011ad234b8be1f5d7f0~c5_100x100.jpeg?x-expires=1660834800&x-signature=rZ9hbecI5vIy7xBQCPft9urDy%2BQ%3D"
                                alt="hehe"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
