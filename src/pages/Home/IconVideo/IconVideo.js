import Menu from '~/component/Popper/Menu';
import {
    LikeIcon,
    CommentIcon,
    ShareIcon,
    DipIcon,
    TelegramRedIcon,
    FacebookIcon,
    WhatsAppIcon,
    LinksIcon,
    DownIcon,
    TwitterIcon,
    LinkedIcon,
    TelegramBlueIcon,
    EmailIcon,
    LineIcon,
    PinTeRestIcon,
    LikeIconFull,
} from '~/component/Icons';

import classNames from 'classnames/bind';
import styles from './IconVideo.module.scss';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <DipIcon />,
        title: 'dip',
    },
    {
        icon: <TelegramRedIcon />,
        title: 'Send to friends',
        to: '/feedback',
    },
    {
        icon: <FacebookIcon />,
        title: 'Share with facebook',
    },

    {
        icon: <WhatsAppIcon />,
        title: 'Share with Whats APp',
    },
    {
        icon: <LinksIcon />,
        title: 'Share with Link',
    },

    {
        shareArrow: <DownIcon />,
        children: {
            data: [
                {
                    icon: <DipIcon />,
                    title: 'dip',
                },
                {
                    icon: <TelegramRedIcon />,
                    title: 'Send to friends',
                },
                {
                    icon: <FacebookIcon />,
                    title: 'Share with facebook',
                },

                {
                    icon: <WhatsAppIcon />,
                    title: 'Share with Whats APP',
                },
                {
                    icon: <LinksIcon />,
                    title: 'Share with Link',
                },
                {
                    icon: <TwitterIcon />,
                    title: 'Share with Twitter',
                },
                {
                    icon: <LinkedIcon />,
                    title: 'Share with LinkedIn',
                },
                {
                    icon: <TelegramBlueIcon />,
                    title: 'Share with Telegram',
                },

                {
                    icon: <EmailIcon />,
                    title: 'Share with Email',
                },
                {
                    icon: <LineIcon />,
                    title: 'Share with Line',
                },
                {
                    icon: <PinTeRestIcon />,
                    title: 'Share with PinTeRest',
                },
            ],
        },
    },
];

function IconVideo({ likeCount, commentsCount, shareCount }) {
    return (
        <div className={cx('wrapper')}>
            <button className={cx('btn-icons')}>
                <span className={cx('icons')}>
                    <LikeIconFull />
                </span>
            </button>
            <strong>{likeCount}</strong>
            <button className={cx('btn-icons')}>
                <span className={cx('icons')}>
                    <CommentIcon />
                </span>
            </button>
            <strong>{commentsCount}</strong>
            <Menu items={MENU_ITEMS} delay={[0, 800]} offset={[8, 8]} placement="top-start" menuShare>
                <button className={cx('btn-icons')}>
                    <span className={cx('icons')}>
                        <ShareIcon />
                    </span>
                </button>
            </Menu>
            <strong>{shareCount}</strong>
        </div>
    );
}

export default IconVideo;
