import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import styles from './SeekBarVideo.module.scss';

const cx = classNames.bind(styles);

function SeekBarVideo({ percent, onSeek, currentTime, durationTime }) {
    const process = useRef();
    const progress = useRef();

    useEffect(() => {
        process.current.style.width = percent + '%';
        progress.current.style.left = percent + '%';
    }, [percent]);
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
        <div className={cx('wrapper')}>
            <div className={cx('progress')}>
                <div ref={process} className={cx('progress-bar')}></div>
                <div ref={progress} className={cx('progress-circle')}></div>
                <input defaultValue={0} type="range" name="" className={cx('range')} onChange={onSeek} />
            </div>
            <div className={cx('seek-timer')}>
                <FormatTime time={currentTime} /> /
                <FormatTime time={durationTime} />
            </div>
        </div>
    );
}

export default SeekBarVideo;
