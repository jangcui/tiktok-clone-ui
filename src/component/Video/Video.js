import { VolumeIcon, PlayIcon, PauseIcon, FlagIcon, MuteIcon } from '~/component/Icons';
import styles from './Video.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import SeekBarVideo from './SeekBarVideo';
// import { useInView } from 'react-intersection-observer';
const cx = classNames.bind(styles);

function Video({ dataVideo, inView, typeVideo, onClick = () => {}, classVideo = '', classIcon = '', ...props }, ref) {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMute, setIsMute] = useState(true);
    const [volume, setVolume] = useState(localStorage.getItem('VOLUME') || 0.5);
    const [currentTimeVideo, setCurrentVideo] = useState(0);
    const [durationVideo, setDurationVideo] = useState(0);
    const [percent, setPerCent] = useState(0);
    const volumeRef = useRef();
    const videoRef = useRef();
    useImperativeHandle(ref, () => ({
        play() {
            videoRef.current.play();
        },
        pause() {
            videoRef.current.pause();
        },
    }));
    useEffect(() => {
        setDurationVideo(videoRef.current.duration);
    }, []);
    useEffect(() => {
        if (isPlaying) {
            if (inView) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        } else {
            videoRef.current.pause();
        }
        // inView && isPlaying === true ? videoRef.current.play() : videoRef.current.pause();
    }, [isPlaying, currentTimeVideo, inView]);

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
        let value = +e.target.value;
        setVolume(value);
        if (value === 0) {
            setIsMute(false);
        } else {
            setIsMute(true);
            localStorage.setItem('VOLUME', value);
        }
    };
    const handleTimePlay = (e) => {
        setCurrentVideo(e.target.currentTime);
        setDurationVideo(e.target.duration);
        let percent = (currentTimeVideo / durationVideo) * 100;
        setPerCent(percent);
    };

    const handleSeekVideo = (e) => {
        let value = parseInt(e.target.value);
        let percent = (value * videoRef.current.duration) / 100;
        videoRef.current.currentTime = percent;
        setPerCent(e.target.value);
        setCurrentVideo(percent);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('wrap-video')}>
                    <video
                        className={classVideo}
                        tabIndex="2"
                        src={dataVideo}
                        type={typeVideo}
                        ref={videoRef}
                        loop
                        onTimeUpdate={handleTimePlay}
                        onClick={onClick}
                        {...props}
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

                    <div className={cx('controls')}>
                        <SeekBarVideo
                            percent={percent}
                            onSeek={handleSeekVideo}
                            currentTime={currentTimeVideo}
                            durationTime={durationVideo}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default forwardRef(Video);
