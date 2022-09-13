import Menu from '~/component/Popper/Menu';
import {
  LikeIcon,
  CommentIcon,
  ShareIcon,
  DipIcon,
  TelegramIcon,
  FacebookIcon,
  WhatsAppIcon,
  LinksIcon,
  DownIcon,
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
    icon: <TelegramIcon />,
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
    icon: <DownIcon className="down-btn" />,
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
