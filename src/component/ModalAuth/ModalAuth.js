import { useEffect, useState } from 'react';
import Button from '../Button';
import styles from './ModalAuth.module.scss';
import classNames from 'classnames/bind';
import ReactDom from 'react-dom';
import {
    AppleIcon,
    BackIcon,
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
import FormSignUp, { FormLogin } from './AccountRegister';
const cx = classNames.bind(styles);

const MENU_SIGN_UP = [
    {
        type: 'qrCode',
        icon: <QRIcon />,
        title: 'Use QR code',
        possible: false,
    },
    {
        type: 'account',
        icon: <UserIcon />,
        title: 'Use phone or email',
        possible: true,
    },
    {
        type: 'facebook',
        icon: <FacebookIcon />,
        title: 'Continue with Facebook',
        possible: false,
    },
    {
        type: 'google',
        icon: <GoogleIcon />,
        title: 'Continue with Google',
        possible: true,
    },
    {
        type: 'twitter',
        icon: <TwitterIcon />,
        title: 'Continue with Twitter',
        possible: false,
    },
    {
        type: 'twitter',
        icon: <LineIcon />,
        title: 'Continue with LINE',
        possible: false,
    },
    {
        type: 'kaKaoTalk',
        icon: <KaKaoTalkIcon />,
        title: 'Continue with KakaoTalk',
        possible: false,
    },
    {
        type: 'apple',
        icon: <AppleIcon />,
        title: 'Continue with Apple',
        possible: false,
    },
    {
        type: 'instagram',
        icon: <InstagramIcon />,
        title: 'Continue with Instagram',
        possible: false,
    },
];

const MENU_SIGN_IN = [
    {
        type: 'account',
        icon: <UserIcon />,
        title: 'Use phone or email',
        possible: true,
    },
    {
        icon: <GoogleIcon />,
        title: 'Continue with Google',
        possible: true,
    },
    {
        icon: <FacebookIcon />,
        title: 'Continue with Facebook',
        possible: false,
        more: <BackIcon />,
        data: [
            {
                icon: <UserIcon />,
                title: 'Use phone or email',
                possible: true,
            },
            {
                icon: <GoogleIcon />,
                title: 'Continue with Google',
                possible: true,
            },
            {
                icon: <FacebookIcon />,
                title: 'Continue with Facebook',
                possible: false,
            },
            {
                icon: <TwitterIcon />,
                title: 'Continue with Twitter',
                possible: false,
            },
            {
                icon: <LineIcon />,
                title: 'Continue with LINE',
                possible: false,
            },
        ],
    },
];
const portal = document.getElementById('modal-auth');

function ModalAuth({ isOpen, onClose }) {
    const [items, setItems] = useState(MENU_SIGN_UP);
    const [isNav, setIsNav] = useState(false);

    useEffect(() => {
        isNav ? setItems(MENU_SIGN_IN) : setItems(MENU_SIGN_UP);
    }, [isNav]);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('hidden');
        } else {
            document.body.classList.remove('hidden');
        }
    }, [isOpen]);
    const handleItems = (item) => {
        switch (item.type) {
            case 'account':
                setItems('');
                break;
            default:
        }
    };
    const handleNav = () => {
        setIsNav(!isNav);
    };
    const handleBack = () => {
        isNav ? setItems(MENU_SIGN_IN) : setItems(MENU_SIGN_UP);
    };
    if (!isOpen) {
        return null;
    }
    return ReactDom.createPortal(
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('header')}>
                        {!isNav ? <h1> Log in to TikTok</h1> : <h1> Sign up for TikTok</h1>}
                        <span className={cx('icon-close')} onClick={onClose}>
                            <CloseIcon />
                        </span>
                        {items.length === 0 && (
                            <span className={cx('icon-back')} onClick={handleBack}>
                                <BackIcon />
                            </span>
                        )}
                    </div>
                    <div className={cx('body')}>
                        {items.length === 0 && isNav && <FormSignUp />}
                        {items.length === 0 && !isNav && <FormLogin />}
                        {items &&
                            items.map((item, index) => (
                                <div key={index} className={cx('wrap-action')} onClick={() => handleItems(item)}>
                                    <Button normal disable={!item.possible} onClick={() => console.log(item)}>
                                        <span className={cx('icon')}>{item.icon}</span>
                                        <p>{item.title}</p>
                                    </Button>
                                    {item.more && (
                                        <span className={cx('show-more')} onClick={() => setItems(item.data)}>
                                            {item.more}
                                        </span>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
                {isNav && (
                    <div className={cx('policy-confirm')}>
                        <p>
                            By continuing, you agree to TikTok’s <i>Terms of Service</i> and confirm that you have read
                            TikTok’s <i>Privacy Policy.</i>
                        </p>
                    </div>
                )}

                <div className={cx('footer')}>
                    {!isNav ? <p>Don’t have an account?</p> : <p>Already have an account?</p>}
                    <span className={cx('nav')} onClick={handleNav}>
                        {!isNav ? 'Sign up' : 'Log in'}
                    </span>
                </div>
            </div>
            <div />
        </div>,
        portal,
    );
}

export default ModalAuth;
