import ReactDom from 'react-dom';
import { useEffect, useState } from 'react';
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
    const [dataVideo, setDataVideo] = useState(data);
    const [dataComment, setDataComment] = useState([{}]);
    useEffect(() => {
        Services.getAVideo(data.uuid).then((data) => {
            setDataVideo(data);
        });
    }, [data]);
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('hidden');
        } else {
            document.body.classList.remove('hidden');
        }
    }, [isOpen]);
    useEffect(() => {
        Services.getCommentsList(data.uuid).then((data) => {
            setDataComment(data);
        });
    }, [data]);

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
                    <Image className={cx('img')} src={dataVideo.thumb_url} alt="ehehe" />
                    <div className={cx('content-video')}>
                        <div className={cx('main-video')}>
                            <video className={cx('video')} src={dataVideo.file_url} />
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
                        <Image className={cx('avatar')} src={dataVideo.user.avatar} alt={dataVideo.user.nickname} />
                        <div className={cx('info')}>
                            <span>{dataVideo.user.first_name + ' ' + dataVideo.user.last_name}</span>
                            <p>{dataVideo.user.nickname}</p>
                        </div>
                        <Button outline> follow</Button>
                    </div>

                    <div className={cx('main-content')}>
                        <div className={cx('des')}>{dataVideo.description}</div>
                        <div className={cx('music')}>
                            <span>
                                <FontAwesomeIcon icon={faMusic} />
                            </span>
                            <h4>{dataVideo.music}</h4>
                        </div>
                        <div className={cx('action')}>
                            <div className={cx('btn-like')}>
                                <span className={cx('like-icon')}>
                                    <LikeIconFull width={'18px'} height={'18px'} />
                                </span>
                                <strong>{dataVideo.likes_count}</strong>
                                <span className={cx('comment-icon')}>
                                    <CommentIcon width={'18px'} height={'18px'} />
                                </span>
                                <strong>{dataVideo.comments_count}</strong>
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
                        {dataComment.map((data, index) => (
                            <div className={cx('block-user')} key={index}>
                                <Image src={data.user.avatar} className={cx('avatar')} />
                                <div className={cx('main-comment')}>
                                    <span className={cx('name-user')}>
                                        {data.user.first_name + ' ' + data.user.last_name}{' '}
                                    </span>
                                    <p className={cx('comment-text')}>{data.comment}</p>
                                    <p className={cx('sub-comment')}>{data.create_at}+ ' ' reppp</p>
                                </div>
                                <div className={cx('like-comment')}>
                                    <DotsIcon width={'20px'} height={'20px'} />
                                    <span className={cx('wrap-like')}>
                                        <div>
                                            <LikeIcon width={'20px'} height={'20px'} />
                                        </div>
                                        <span className={cx('count')}>{data.likes_count}</span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={cx('post-comment')}>
                        <div className={cx('container')}>
                            <div className={cx('wrap-input')}>
                                <input type="text" placeholder="viet cmt..." />
                            </div>
                            <Button normal className={cx('btn-post')}>
                                Post
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        portal,
    );
}

export default ModalDetailVideo;
