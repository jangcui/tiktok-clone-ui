import ReactDom from 'react-dom';
import classNames from 'classnames/bind';
import styles from './ModalDetailVideo.module.scss';
import Image from '../Image';
import { CloseIcon, DownIcon, FlagIcon, LogoIcon, MuteIcon, PauseIcon, PlayIcon, UpIcon, VolumeIcon } from '../Icons';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartMusicCameraBolt, faMusic } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

const portal = document.getElementById('modal-detail-video');

function ModalDetailVideo({ data, isOpen, onClose }) {
    const FormatTime = ({ time }) => {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);
        let minuteValue, secondValue;

        minuteValue = minutes < 10 ? '0' + minutes : minutes;
        secondValue = seconds < 10 ? '0' + seconds : seconds;

        let mediaTime = minuteValue + ':' + secondValue;
        return mediaTime;
    };

    return ReactDom.createPortal(
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('wrap-video')}>
                    <Image
                        className={cx('img')}
                        src="https://files.fullstack.edu.vn/f8-tiktok/users/3906/6348230a18035.jpg"
                        alt="ehehe"
                    />
                    <div className={cx('content-video')}>
                        <div className={cx('main-video')}>
                            <video
                                className={cx('video')}
                                src="https://files.fullstack.edu.vn/f8-tiktok/videos/504-634bda7b3b3d3.mp4"
                            />
                            <div className={cx('controls')}>
                                <div className={cx('seek-slider')}>
                                    <span className={cx('progress')}>
                                        <span className={cx('process')}></span>
                                    </span>
                                </div>
                                <div className={cx('seek-timer')}>
                                    <FormatTime time={'12'} /> /
                                    <FormatTime time={'15'} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('volume-control')}>
                        <div className={cx('volume-progress')}></div>
                        <div className={cx('volume-process')}></div>
                        <div className={cx('volume-dot')}></div>
                    </div>
                    <span className={cx('icon', 'icon-logo')}>
                        <LogoIcon width={'40px'} height={'40px'} />
                    </span>
                    <span className={cx('icon', 'icon-flag')}>
                        <FlagIcon height={'14px'} width={'14px'} />
                        <p> Báo cáo</p>
                    </span>
                    <span className={cx('icon', 'icon-close')}>
                        <CloseIcon height={'24px'} width={'24px'} />
                    </span>

                    <span className={cx('icon', 'icon-up')}>
                        <UpIcon />
                    </span>
                    <span className={cx('icon', 'icon-down')}>
                        <UpIcon />
                    </span>
                    <span className={cx('icon', 'icon-play')}>
                        <PlayIcon height={'80px'} width={'80px'} />
                    </span>

                    <span className={cx('icon', 'icon-mute')}>
                        <MuteIcon />
                    </span>

                    <span className={cx('icon', 'icon-sound')}>
                        <VolumeIcon />
                    </span>
                </div>

                <div className={cx('wrap-comment')}>
                    <div className={cx('user')}>
                        <Image
                            className={cx('avatar')}
                            src="https://files.fullstack.edu.vn/f8-tiktok/users/11/630266fd71515.jpg"
                            alt="hehehe"
                        />
                        <div className={cx('info')}>
                            <span>namsssssssssssssse</span>
                            <p>nick ddddddddddddddddddddname</p>
                        </div>
                        <Button outline> follow</Button>
                    </div>

                    <div className={cx('main-content')}>
                        <div className={cx('des')}>
                            Có muộn trend quá hông ta? Cám ơn team anh @Tuấn Ngọc Võ rất nhìuuu. IB @Quỳnh Thi
                            #thanhmeo18 #makeyoulook
                        </div>
                        <div className={cx('music')}>
                            <span>
                                <FontAwesomeIcon icon={faMusic} />
                            </span>
                            <h4>Made You Look - Meghan Trainor</h4>
                        </div>
                        <div className={cx('action')}></div>
                        <div className={cx('link')}></div>
                    </div>

                    <div className={cx('view-comment')}></div>
                    <div className={cx('post-comment')}></div>
                </div>
            </div>
        </div>,
        portal,
    );
}

export default ModalDetailVideo;
