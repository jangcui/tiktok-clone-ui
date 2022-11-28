import { useState } from 'react';
import Button from '../Button';
import styles from './ModalAuth.module.scss';
import classNames from 'classnames/bind';
import ReactDom from 'react-dom';
import {
    AppleIcon,
    CloseIcon,
    FacebookIcon,
    GoogleIcon,
    InstagramIcon,
    KaKaoTalkIcon,
    LineIcon,
    QRIcon,
    TwitterIcon,
    UserIcon,
} from '../Icons';
const cx = classNames.bind(styles);

const MENU_SIGN_UP = [
    {
        icon: <QRIcon />,
        title: 'Sử dụng mã QR',
        possible: false,
    },
    {
        icon: <UserIcon />,
        title: 'Số điện thoại / Email / TikTok ID',
        possible: true,
    },
    {
        icon: <FacebookIcon />,
        title: 'Tiếp tục với Facebook',
        possible: false,
    },
    {
        icon: <GoogleIcon />,
        title: 'Tiếp tục với Google',
        possible: false,
    },
    {
        icon: <TwitterIcon />,
        title: 'Tiếp tục với Twitter',
        possible: false,
    },
    {
        icon: <LineIcon />,
        title: 'Tiếp tục với LINE',
        possible: false,
    },
    {
        icon: <KaKaoTalkIcon />,
        title: 'Tiếp tục với KakaoTalk',
        possible: false,
    },
    {
        icon: <AppleIcon />,
        title: 'Tiếp tục với Apple',
        possible: false,
    },
    {
        icon: <InstagramIcon />,
        title: 'Tiếp tục với Instagram',
        possible: false,
    },
];

const MENU_SIGN_IN = [
    {
        icon: <UserIcon />,
        title: 'Số điện thoại / Email / TikTok ID',
        possible: true,
    },
    {
        icon: <FacebookIcon />,
        title: 'Tiếp tục với Facebook',
        possible: false,
    },
    {
        icon: <GoogleIcon />,
        title: 'Tiếp tục với Google',
        possible: false,
    },
    {
        icon: <TwitterIcon />,
        title: 'Tiếp tục với Twitter',
        possible: false,
    },
    {
        icon: <LineIcon />,
        title: 'Tiếp tục với LINE',
        possible: false,
    },
];
function ModalAuth() {
    const [items, setItems] = useState(MENU_SIGN_UP);

    const handleClose = () => {};
    const handleItems = () => {};
    return ReactDom.createPortal(
        <div className={cx('modal')}>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('content')}>
                        <div className={cx('header')}>
                            <h1> Đăng nhập vào TikTok</h1>
                            <span onClick={handleClose}>
                                <CloseIcon />
                            </span>
                        </div>
                        <div className={cx('mid')}>
                            {items.map((item, index) => (
                                <div key={index} className={cx('wrap-action')}>
                                    <span className={cx('icon')}>{item.icon}</span>
                                    <Button normal className={cx('btn')} onClick={handleItems}>
                                        <div>{item.title}</div>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={cx('footer')}>
                        <p>you had the account?</p>
                        <span className={cx('nav')}> register </span>
                    </div>
                </div>
                <div />
            </div>
        </div>,
        document.getElementById('modal'),
    );
}

export default ModalAuth;
