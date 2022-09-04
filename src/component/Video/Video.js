import { VolumeIcon, PlayIcon, PauseIcon, FlagIcon, MuteIcon } from '~/component/Icons';
import styles from './Video.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';

const cx = classNames.bind(styles);

function Video({ dataVideo, typeVideo }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(true);
  const [volume, setVolume] = useState(0.8 ? localStorage.getItem('thisVolume') : '');

  const videoRef = useRef();
  const volumeRef = useRef(volume);

  const soundSave = () => {
    let save = volumeRef.current.value;
    localStorage.setItem('thisVolume', save);
    return save;
  };

  useEffect(() => {
    isPlaying ? videoRef.current.play() : videoRef.current.pause();
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    setVolume(volume);
    isMute ? (videoRef.current.volume = volume) : (videoRef.current.volume = 0);
  }, [volume, isMute]);

  const handleMute = () => {
    setIsMute(!isMute);
    isMute ? setVolume(0) : setVolume(localStorage.getItem('thisVolume'));
  };

  const handleVolume = () => {
    volume !== '0' ? setIsMute(true) : setIsMute(false);
    setVolume(soundSave());
  };
  const handleSeek = () => {};

  console.log(videoRef.current.currentTime);

  return (
    <div className={cx('wrapper')}>
      <video className={cx('video')} tabIndex="2" src={dataVideo} type={typeVideo} ref={videoRef} />
      <p className={cx('flag')}>
        <FlagIcon />
        Báo cáo
      </p>

      {isPlaying ? (
        <PauseIcon className={cx('pause')} onClick={handlePlay} />
      ) : (
        <PlayIcon className={cx('play')} onClick={handlePlay} />
      )}

      {isMute === false || volume === '0' ? (
        <MuteIcon className={cx('sound-mute')} onClick={handleMute} />
      ) : (
        <VolumeIcon className={cx('sound-on')} onClick={handleMute} />
      )}

      <label for="slider" className={cx('wrap-volume')}>
        <input
          id="slider"
          className={cx('slider-volume')}
          type="range"
          min={0}
          max={1}
          step="0.05"
          ref={volumeRef}
          value={volume}
          onChange={handleVolume}
        />
      </label>
      <div className={cx('wrap-slider')}>
        <div className={cx('seek-slider')} onChange={handleSeek}>
          <span className={cx('progress')}>
            <span className={cx('process')}></span>
          </span>
        </div>
        <div className={cx('seek-timer')}>12:00</div>
      </div>
    </div>
  );
}

export default Video;
