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
} from '~/component/Icons';

import classNames from 'classnames/bind';
import styles from './IconVideo.module.scss';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <DipIcon />,
    title: 'Nhúng',
  },
  {
    icon: <TelegramRedIcon />,
    title: 'Gửi đến bạn bè',
    to: '/feedback',
  },
  {
    icon: <FacebookIcon />,
    title: 'Chia sẻ với facebook',
  },

  {
    icon: <WhatsAppIcon />,
    title: 'Chia sẻ với Whats APp',
  },
  {
    icon: <LinksIcon />,
    title: 'Chia sẻ với liên kết',
  },

  {
    shareArrow: <DownIcon />,
    children: {
      data: [
        {
          icon: <DipIcon />,
          title: 'Nhúng',
        },
        {
          icon: <TelegramRedIcon />,
          title: 'Gửi đến bạn bè',
        },
        {
          icon: <FacebookIcon />,
          title: 'Chia sẻ với facebook',
        },

        {
          icon: <WhatsAppIcon />,
          title: 'Chia sẻ với Whats APp',
        },
        {
          icon: <LinksIcon />,
          title: 'Chia sẻ với liên kết',
        },
        {
          icon: <TwitterIcon />,
          title: 'Chia sẻ với Twitter',
        },
        {
          icon: <LinkedIcon />,
          title: 'Chia sẻ với LinkedIn',
        },
        {
          icon: <TelegramBlueIcon />,
          title: 'Chia sẻ với Telegram',
        },

        {
          icon: <EmailIcon />,
          title: 'Chia sẻ với Email',
        },
        {
          icon: <LineIcon />,
          title: 'Chia sẻ với Line',
        },
        {
          icon: <PinTeRestIcon />,
          title: 'Chia sẻ với Pinterest',
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
          <LikeIcon />
        </span>
      </button>
      <strong>{likeCount}</strong>
      <button className={cx('btn-icons')}>
        <span className={cx('icons')}>
          <CommentIcon />
        </span>
      </button>
      <strong>{commentsCount}</strong>
      <Menu items={MENU_ITEMS} placement="top-start" menuShare>
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
