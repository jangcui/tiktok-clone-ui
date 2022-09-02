import { LikeIcon, CommentIcon, ShareIcon } from '~/component/Icons';
import classNames from 'classnames/bind';
import styles from './IconVideo.module.scss';

const cx = classNames.bind(styles);

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
      <button className={cx('btn-icons')}>
        <span className={cx('icons')}>
          <ShareIcon />
        </span>
      </button>
      <strong>{shareCount}</strong>
    </div>
  );
}

export default IconVideo;
