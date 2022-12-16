import ReactDom from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalDetailVideo.module.scss';
import Image from '../Image';
import * as Services from '~/Services/Services';
import {
    CloseIcon,
    FlagIcon,
    LogoIcon,
    MuteIcon,
    LikeIcon,
    DipIcon,
    TelegramRedIcon,
    FacebookIcon,
    WhatsAppIcon,
    LinksIcon,
    ShareIcon,
    CommentIcon,
    PlayIcon,
    UpIcon,
    VolumeIcon,
    LikeIconFull,
    DotsIcon,
} from '../Icons';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import Video from '../Video';
import UserContext from '../UserContext';
import { useDebounce } from '~/hook';

const cx = classNames.bind(styles);

const portal = document.getElementById('modal-detail-video');
const MENU_ITEMS = [
    {
        icon: <DipIcon width={'24px'} height={'24px'} />,
        title: 'Embed',
    },
    {
        icon: <TelegramRedIcon width={'24px'} height={'24px'} />,
        title: 'Send to friends',
    },
    {
        icon: <FacebookIcon width={'24px'} height={'24px'} />,
        title: 'Share to Facebook',
    },
    {
        icon: <WhatsAppIcon width={'24px'} height={'24px'} />,
        title: 'Share to WhatsApp',
    },
    {
        icon: <LinksIcon width={'24px'} height={'24px'} />,
        title: 'Share to Twitter',
    },
];

function ModalDetailVideo({ data, isOpen, onClose }) {
    const user = UserContext();
    const [dataComment, setDataComment] = useState([]);
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef();

    const deBounceComment = useDebounce(dataComment, 800);

    useEffect(() => {
        user &&
            Services.getCommentsList(data.id).then((value) => {
                if (value) {
                    setDataComment(value);
                }
            });
    }, [data, user]);
    useEffect(() => {
        isPlaying ? videoRef.current.play() : videoRef.current.pause();
    }, [isPlaying]);

    useEffect(() => {
        setIsPlaying(true);
    }, []);
    const FormatTime = ({ time }) => {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);
        let minuteValue, secondValue;

        minuteValue = minutes < 10 ? '0' + minutes : minutes;
        secondValue = seconds < 10 ? '0' + seconds : seconds;

        let mediaTime = minuteValue + ':' + secondValue;
        return mediaTime;
    };

    const Popper = ({ children, title }) => {
        return (
            <Tippy content={title} placement="top" offset={[0, 15]}>
                <span> {children}</span>
            </Tippy>
        );
    };

    if (!isOpen) {
        return null;
    }
    return ReactDom.createPortal(
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('wrap-video')}>
                    <Image className={cx('img')} src={data.thumb_url} alt="avatar" />
                    <div className={cx('content-video')}>
                        <div className={cx('main-video')}>
                            <video
                                className={cx('video')}
                                src={data.file_url}
                                ref={videoRef}
                                onClick={() => setIsPlaying(!isPlaying)}
                                loop
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
                    <span className={cx('icon', 'icon-close')} onClick={onClose}>
                        <CloseIcon height={'24px'} width={'24px'} />
                    </span>
                    <span className={cx('icon', 'icon-up')}>
                        <UpIcon />
                    </span>
                    <span className={cx('icon', 'icon-down')}>
                        <UpIcon />
                    </span>
                    {!isPlaying && (
                        <span className={cx('icon', 'icon-play')} onClick={() => setIsPlaying(!isPlaying)}>
                            <PlayIcon height={'80px'} width={'80px'} />
                        </span>
                    )}
                    <span className={cx('icon', 'icon-mute')}>
                        <MuteIcon />
                    </span>
                    <span className={cx('icon', 'icon-sound')}>
                        <VolumeIcon />
                    </span>
                </div>

                <div className={cx('wrap-comment')}>
                    <div className={cx('user')}>
                        <Image className={cx('avatar')} src={data && data.user.avatar} alt={data.user.nickname} />
                        <div className={cx('info')}>
                            <span>{data.user.first_name + ' ' + data.user.last_name}</span>
                            <p>{data.user.nickname}</p>
                        </div>
                        <Button outline> follow</Button>
                    </div>

                    <div className={cx('main-content')}>
                        <div className={cx('des')}>{data.description}</div>
                        <div className={cx('music')}>
                            <span>
                                <FontAwesomeIcon icon={faMusic} />
                            </span>
                            <h4>{data.music}</h4>
                        </div>
                        <div className={cx('action')}>
                            <div className={cx('btn-like')}>
                                <span className={cx('like-icon')}>
                                    <LikeIconFull width={'18px'} height={'18px'} />
                                </span>
                                <strong>{data.likes_count}</strong>
                                <span className={cx('comment-icon')}>
                                    <CommentIcon width={'18px'} height={'18px'} />
                                </span>
                                <strong>{data.comments_count}</strong>
                            </div>
                            <div className={cx('btn-share')}>
                                {MENU_ITEMS.map((item, index) => (
                                    <Popper title={item.title} key={index}>
                                        {item.icon}
                                    </Popper>
                                ))}
                                <span>
                                    <ShareIcon width={'20px'} height={'20px'} />
                                </span>
                            </div>
                        </div>
                        <div className={cx('link')}>
                            <p>
                                https://www.tiktok.com/@quankhonggo/video/7165878163581488411?is_from_webapp=1&sender_device=pc&web_id=7175826600139212289
                            </p>
                            <span>
                                <strong>Copy link</strong>
                            </span>
                        </div>
                    </div>
                    <div className={cx('view-comment')}>
                        {user ? (
                            deBounceComment.map((value, index) => (
                                <div className={cx('block-user')} key={index}>
                                    <Image src={value.user.avatar} className={cx('avatar')} />
                                    <div className={cx('main-comment')}>
                                        <span className={cx('name-user')}>
                                            {value.user.first_name + ' ' + value.user.last_name}{' '}
                                        </span>
                                        <p className={cx('comment-text')}>{value.comment}</p>
                                        <p className={cx('sub-comment')}>{value.create_at}+ ' ' reppp</p>
                                    </div>
                                    <div className={cx('like-comment')}>
                                        <DotsIcon width={'20px'} height={'20px'} />
                                        <span className={cx('wrap-like')}>
                                            <div>
                                                <LikeIcon width={'20px'} height={'20px'} />
                                            </div>
                                            <span className={cx('count')}>{value.likes_count}</span>
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>vui lòng đăng nhập</p>
                        )}
                    </div>
                    <div className={cx('post-comment')}>
                        <div className={cx('container')}>
                            {user ? (
                                <>
                                    <div className={cx('wrap-input')}>
                                        <input type="text" placeholder="viet cmt..." />
                                    </div>
                                    <Button normal className={cx('btn-post')}>
                                        Post
                                    </Button>
                                </>
                            ) : (
                                <p>đăng nhập đăng bình luận</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        portal,
    );
}

export default ModalDetailVideo;
