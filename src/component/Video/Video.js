import PropTypes from 'prop-types';

import { PlayIcon, PauseIcon, FlagIcon } from '~/component/Icons';
import styles from './Video.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import SeekBarVideo from './SeekBarVideo';
import VolumeVideo from './VolumeVideo';

import VolumeContext from '../VolumeContext';
const cx = classNames.bind(styles);

function Video({ dataVideo, inView, typeVideo, onClick, classVideo, classIcon, ...props }, ref) {
    const volumes = VolumeContext();
    const { volume } = volumes;
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTimeVideo, setCurrentVideo] = useState(0);
    const [durationVideo, setDurationVideo] = useState(0);
    const [percent, setPerCent] = useState(0);
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
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }
    }, [volume]);

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
    }, [isPlaying, currentTimeVideo, inView]);

    const handlePlay = () => {
        setIsPlaying(!isPlaying);
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
                    <div onClick={handlePlay}>
                        {isPlaying ? <PauseIcon className={cx('play')} /> : <PlayIcon className={cx('play')} />}
                    </div>

                    <div className={cx('wrap-volume')}>
                        <VolumeVideo />
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
forwardRef(Video).propTypes = {
    dataVideo: PropTypes.string.isRequired,
    inView: PropTypes.bool,
    typeVideo: PropTypes.string,
    onClick: PropTypes.func,
    classVideo: PropTypes.string,
    classIcon: PropTypes.string,
    props: PropTypes.object,
    ref: PropTypes.object,
};

export default forwardRef(Video);
