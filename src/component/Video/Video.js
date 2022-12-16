import { VolumeIcon, PlayIcon, PauseIcon, FlagIcon, MuteIcon } from '~/component/Icons';
import styles from './Video.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
const cx = classNames.bind(styles);

function Video({ dataVideo, typeVideo, onClick = () => {} }) {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMute, setIsMute] = useState(true);
    const [volume, setVolume] = useState(localStorage.getItem('VOLUME') || 0.5);
    const [currentTimeVideo, setCurrentVideo] = useState(0);
    const [durationVideo, setDurationVideo] = useState(0);

    const videoRef = useRef();
    const volumeRef = useRef(volume);
    const seekVideoRef = useRef();

    const { ref, inView } = useInView({
        threshold: 0.8,
        delay: 700,
    });

    useEffect(() => {
        if (isPlaying) {
            if (inView) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        } else {
            videoRef.current.pause();
        }
        setDurationVideo(videoRef.current.duration);
        // inView && isPlaying === true ? videoRef.current.play() : videoRef.current.pause();
    }, [isPlaying, currentTimeVideo, inView]);
    useEffect(() => {
        inView ? setIsPlaying(true) : setIsPlaying(false);
    }, [inView]);
    const handlePlay = () => {
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        isMute ? (videoRef.current.volume = volume) : (videoRef.current.volume = 0);
    }, [volume, isMute]);

    const handleMute = () => {
        setIsMute(!isMute);
        isMute ? setVolume(0) : setVolume(0.55);
    };

    const handleVolume = (e) => {
        let value = e.target.value;
        setVolume(value);
        if (value === '0') {
            setIsMute(false);
        } else {
            setIsMute(true);
            localStorage.setItem('VOLUME', value);
        }
    };
    const handleTimePlay = (e) => {
        setCurrentVideo(e.target.currentTime);
        const percent = (currentTimeVideo / durationVideo) * 100;
        if (durationVideo > 10) {
            seekVideoRef.current.style.width = percent + '%';
        }
    };
    const handleSeek = (e) => {
        let parent = seekVideoRef.current.parentNode;
        let seekWidth = e.nativeEvent.offsetX;
        let progressWidth = parent.offsetWidth;
        const ratio = (seekWidth * durationVideo) / progressWidth;
        videoRef.current.currentTime = ratio;
        setCurrentVideo(ratio);
    };

    const FormatTime = ({ time }) => {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);
        let minuteValue, secondValue;

        minuteValue = minutes < 10 ? '0' + minutes : minutes;
        secondValue = seconds < 10 ? '0' + seconds : seconds;

        let mediaTime = minuteValue + ':' + secondValue;
        return mediaTime;
    };

    return (
        <div className={cx('wrapper')} ref={ref}>
            <div className={cx('container')}>
                <div className={cx('wrap-video')} onClick={() => setIsPlaying(false)}>
                    <video
                        className={cx('video')}
                        tabIndex="2"
                        src={dataVideo}
                        type={typeVideo}
                        ref={videoRef}
                        loop
                        onTimeUpdate={handleTimePlay}
                        onClick={onClick}
                    />
                </div>

                <div className={cx('wrap-icon')}>
                    <p className={cx('flag')}>
                        <FlagIcon />
                        Báo cáo
                    </p>

                    {isPlaying ? (
                        <div onClick={handlePlay}>
                            <PauseIcon className={cx('pause')} />
                        </div>
                    ) : (
                        <div onClick={handlePlay}>
                            <PlayIcon className={cx('play')} />
                        </div>
                    )}
                    {isMute ? (
                        <div onClick={handleMute} className={cx('sound')}>
                            <VolumeIcon />
                        </div>
                    ) : (
                        <div onClick={handleMute} className={cx('sound', 'mute')}>
                            <MuteIcon />
                        </div>
                    )}
                    <div className={cx('wrap-volume')}>
                        <input
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
                    {durationVideo >= 10 && (
                        <div className={cx('controls')}>
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
            </div>
        </div>
    );
}

export default Video;
