import { VolumeIcon, PlayIcon, PauseIcon, FlagIcon, MuteIcon } from '~/component/Icons';
import styles from './Video.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const cx = classNames.bind(styles);

function Video({ dataVideo, typeVideo }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(true);
  const [volume, setVolume] = useState(0.4 ? localStorage.getItem('thisVolume') : 0.5);
  const [currentTimeVideo, setCurrentVideo] = useState(0);
  const [durationVideo, setDurationVideo] = useState(0);
  const videoRef = useRef();
  const volumeRef = useRef(volume);
  const seekVideoRef = useRef();

  const { ref, inView } = useInView({
    /* Optional options */
    delay: 300,
    threshold: 1,
  });

  const soundSave = () => {
    let save = volumeRef.current.value;
    localStorage.setItem('thisVolume', save);
    return save;
  };
  useEffect(() => {
    if (inView) {
      videoRef.current.play();

      if (!isPlaying) {
        videoRef.current.pause();
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(true);
    }

    // inView === true && isPlaying === true ? videoRef.current.play() : videoRef.current.pause();

    // inView === false && videoRef.current.load();
    setDurationVideo(videoRef.current.duration);
  }, [inView, isPlaying]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    setVolume(volume);
    isMute ? (videoRef.current.volume = volume) : (videoRef.current.volume = 0);
  }, [volume, isMute]);

  const handleMute = () => {
    setIsMute(!isMute);
    isMute ? setVolume(0) : setVolume(() => localStorage.getItem('thisVolume'));
  };

  const handleVolume = () => {
    volume !== '0' ? setIsMute(true) : setIsMute(false);
    isMute ? setVolume(0) : setVolume(localStorage.getItem('thisVolume'));

    setVolume(soundSave());
  };
  const handleTimePlay = () => {
    setCurrentVideo(videoRef.current.currentTime);
    const percent = (currentTimeVideo / durationVideo) * 100;
    if (durationVideo > 10) {
      seekVideoRef.current.style.width = percent + '%';
    }
  };

  const handleSeek = (e) => {
    let parent = seekVideoRef.current.parentNode;
    let seekWidth = e.nativeEvent.offsetX;
    let progressWidth = parent.offsetWidth;

    const cc = (seekWidth * durationVideo) / progressWidth;
    videoRef.current.currentTime = cc;
    setCurrentVideo(cc);
  };

  function FormatTime({ time }) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    let minuteValue, secondValue;

    minuteValue = minutes < 10 ? '0' + minutes : minutes;
    secondValue = seconds < 10 ? '0' + seconds : seconds;

    let mediaTime = minuteValue + ':' + secondValue;
    return mediaTime;
  }

  return (
    <div className={cx('wrapper')} ref={ref}>
      <video
        className={cx('video')}
        tabIndex="2"
        src={dataVideo}
        type={typeVideo}
        ref={videoRef}
        onTimeUpdate={handleTimePlay}
        muted={() => {}}
        loop
      />

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

      <div className={cx('wrap-volume')}>
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
      </div>
      {durationVideo > 7 && (
        <div className={cx('wrap-slider')}>
          <div className={cx('seek-slider')} onClick={handleSeek}>
            <span className={cx('progress')} ref={seekVideoRef}>
              <span className={cx('process')}></span>
            </span>
          </div>

          <div className={cx('seek-timer')}>
            <FormatTime time={currentTimeVideo} /> /
            <FormatTime time={durationVideo} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Video;
