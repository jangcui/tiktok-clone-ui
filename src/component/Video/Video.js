import { VolumeIcon, PlayIcon, PauseIcon, FlagIcon, MuteIcon } from '~/component/Icons';
import styles from './Video.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
const cx = classNames.bind(styles);

function Video({ dataVideo, typeVideo }) {
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
        delay: 600,
    });

    useEffect(() => {
        inView && isPlaying === true ? videoRef.current.play() : videoRef.current.pause();
        setDurationVideo(videoRef.current.duration);
    }, [isPlaying, currentTimeVideo, inView]);

    const handlePlay = () => {
        setIsPlaying((e) => !e);
    };
    useEffect(() => {
        isMute ? (videoRef.current.volume = volume) : (videoRef.current.volume = 0);
    }, [volume, isMute]);

    const handleMute = () => {
        setIsMute(!isMute);
        isMute ? setVolume(0) : setVolume(localStorage.getItem('VOLUME') || 0.55);
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
            {/* <video
                className={cx('video')}
                tabIndex="2"
                src={dataVideo}
                type={typeVideo}
                ref={videoRef}
                onTimeUpdate={handleTimePlay}
            /> */}

            <video
                className={cx('video')}
                tabIndex="2"
                src={dataVideo}
                type={typeVideo}
                ref={videoRef}
                loop
                onTimeUpdate={handleTimePlay}
            />
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
            {!isMute ? (
                <div onClick={handleMute} className={cx('sound', 'mute')}>
                    <MuteIcon />
                </div>
            ) : (
                <div onClick={handleMute} className={cx('sound')}>
                    <VolumeIcon />
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
            {/* <div className={cx('wrap-slider')}>
                <div className={cx('seek-slider')} onChange={handleSeek}>
                    <span className={cx('progress')}>
                        <span className={cx('process')}></span>
                    </span>
                </div>
                <div className={cx('seek-timer')}>12:00</div>
            </div>
        </div> */}
        </div>
    );
}

export default Video;
