import classNames from 'classnames/bind';
import styles from './Video.module.scss';

import { VolumeIcon, PlayIcon, PauseIcon, FlagIcon, MuteIcon } from '~/component/Icons';

const cx = classNames.bind(styles);

function Video({ dataVideo, typeVideo }) {
  return (
    <div className={cx('wrapper')}>
      <video className={cx('video')} tabIndex="2" src={dataVideo} type={typeVideo}></video>

      <p className={cx('flag')}>
        <FlagIcon />
        Báo cáo
      </p>
      <VolumeIcon className={cx('sound-on')} />
      <MuteIcon className={cx('sound-mute')} />
      <PauseIcon className={cx('pause')} />
      <PlayIcon className={cx('play')} />
      <div className={cx('wrap-slider')}>
        <input className={cx('slider-volume')} type="range" min="0" max="10" step="0.05" />
      </div>
    </div>
  );
}

export default Video;
