import Menu from '~/component/Popper/Menu';
import className from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/asset/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleQuestion,
  faEarthAsia,
  faEllipsisVertical,
  faKeyboard,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '~/component/Button';
import { MessageIcon, UploadIcon } from '~/component/icons';
import Image from '~/component/image';
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
          code: 'en',
          title: 'English',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
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
  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faCircleQuestion} />,
      title: 'View profile',
      to: '/@hehe',
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

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <img src={images.logo} alt="logo-tiktok" />
        </div>
        <Search />
        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <Button normal>
                <FontAwesomeIcon icon={faPlus} className={cx('plus-upload')} />
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
          <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
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
