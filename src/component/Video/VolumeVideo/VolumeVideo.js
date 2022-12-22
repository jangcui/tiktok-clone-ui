import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VolumeVideo.module.scss';
import { MuteIcon, VolumeIcon } from '~/component/Icons';
import VolumeContext from '~/component/VolumeContext';

const cx = classNames.bind(styles);

function VolumeVideo() {
    const volumes = VolumeContext();
    const { volume, setVolume } = volumes;
    const [slider, setSlider] = useState(volume);

    useEffect(() => {
        setSlider(volume * 40);
    }, [volume]);

    const handleMuted = () => {
        const value = localStorage.getItem('VOLUME');
        if (+volume === 0 && +value === 0) {
            setVolume(0.5);
            localStorage.setItem('VOLUME', 0.5);
        } else {
            setVolume((prev) => (+prev === 0 ? value : 0));
        }
    };
    const handleValueVolumeChange = (e) => {
        const value = +e.target.value;
        localStorage.setItem('VOLUME', value);
        setVolume(value);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('progress')}>
                <div className={cx('progress-bar')} style={{ height: `${slider}px` }}>
                    <div className={cx('progress-circle')}></div>
                </div>
            </div>
            <div className={cx('icon')} onClick={handleMuted}>
                {+volume === 0 ? <MuteIcon /> : <VolumeIcon />}
            </div>{' '}
            <input
                value={volume}
                type="range"
                min={0}
                max={1}
                step={0.05}
                name=""
                className={cx('range')}
                onChange={handleValueVolumeChange}
            />
        </div>
    );
}

export default VolumeVideo;
