import { VolumeIcon, PlayIcon, PauseIcon, FlagIcon, MuteIcon } from '~/component/Icons';
import styles from './Video.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
<<<<<<< HEAD
import { useInView } from 'react-intersection-observer';
=======
>>>>>>> d6f69fef05ba359894ba3593f4ae013b319f9907

const cx = classNames.bind(styles);

function Video({ dataVideo, typeVideo }) {
<<<<<<< HEAD
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(true);
    const [volume, setVolume] = useState(localStorage.getItem('VOLUME') || 0.5);
    const [currentTimeVideo, setCurrentVideo] = useState(0);
    const [durationVideo, setDurationVideo] = useState(0);

  const videoRef = useRef();
  const volumeRef = useRef(volume);
  const seekVideoRef = useRef();

  const { ref, inView } = useInView({
    threshold: 1,
  });
=======
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(true);
  const [volume, setVolume] = useState(0.8 ? localStorage.getItem('thisVolume') : '');

  const videoRef = useRef();
  const volumeRef = useRef(volume);

>>>>>>> d6f69fef05ba359894ba3593f4ae013b319f9907
  const soundSave = () => {
    let save = volumeRef.current.value;
    localStorage.setItem('thisVolume', save);
    return save;
  };

  useEffect(() => {
<<<<<<< HEAD
    inView && isPlaying === true ? videoRef.current.play() : videoRef.current.pause();
    setDurationVideo(videoRef.current.duration);
  }, [isPlaying, currentTimeVideo, inView]);
=======
    isPlaying ? videoRef.current.play() : videoRef.current.pause();
  }, [isPlaying]);
>>>>>>> d6f69fef05ba359894ba3593f4ae013b319f9907

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
<<<<<<< HEAD
    isMute ? setVolume(0) : setVolume(localStorage.getItem('thisVolume'));

    setVolume(soundSave());
  };
  const handleTimePlay = () => {
    setCurrentVideo(videoRef.current.currentTime);
    const percent = (currentTimeVideo / durationVideo) * 100;
    if (durationVideo > 10) {
      seekVideoRef.current.style.width = percent + '%';

    const handleMute = () => {
        setIsMute((e) => !e);
        if (isMute) {
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
    <div className={cx('wrapper')} ref={ref} inView={inView}>
      <video
        className={cx('video')}
        tabIndex="2"
        src={dataVideo}
        type={typeVideo}
        ref={videoRef}
        onTimeUpdate={handleTimePlay}
      />

=======
    setVolume(soundSave());
  };
  const handleSeek = () => {};

  console.log(videoRef.current.currentTime);

  return (
    <div className={cx('wrapper')}>
      <video className={cx('video')} tabIndex="2" src={dataVideo} type={typeVideo} ref={videoRef} />
>>>>>>> d6f69fef05ba359894ba3593f4ae013b319f9907
      <p className={cx('flag')}>
        <FlagIcon />
        Báo cáo
      </p>
<<<<<<< HEAD
=======

>>>>>>> d6f69fef05ba359894ba3593f4ae013b319f9907
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

<<<<<<< HEAD
      <label htmlFor="slider" className={cx('wrap-volume')}>
=======
      <label for="slider" className={cx('wrap-volume')}>
>>>>>>> d6f69fef05ba359894ba3593f4ae013b319f9907
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
<<<<<<< HEAD
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
=======
      <div className={cx('wrap-slider')}>
        <div className={cx('seek-slider')} onChange={handleSeek}>
          <span className={cx('progress')}>
            <span className={cx('process')}></span>
          </span>
        </div>
        <div className={cx('seek-timer')}>12:00</div>
      </div>
>>>>>>> d6f69fef05ba359894ba3593f4ae013b319f9907
    </div>
  );
}

export default Video;
