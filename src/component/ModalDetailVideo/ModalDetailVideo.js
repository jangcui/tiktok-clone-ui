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
    DipIcon,
    TelegramRedIcon,
    FacebookIcon,
    WhatsAppIcon,
    LinksIcon,
    ShareIcon,
    CommentIcon,
    PlayIcon,
    UpIcon,
    LikeIconFull,
} from '../Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import Video from '../Video';
import SubInfoAvatar from '../SubInfoUser/SubInfoAvatar';
import BtnToggleFollow from '../BtnToggleFollow';
import UserContext from '../Contexts/UserContext/UserContext';
import VolumeVideo from '../Video/VolumeVideo';
import IconLikeVideo from '~/pages/Home/IconVideo/IconLikeVideo';
import ModalAuth from '../ModalAuth';
import SkeletonLoader from './SkeletonLoader';
import CommentList from './CommentList';
import PostComment from './PostComment';

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

function ModalDetailVideo({ data, isOpen, onClose, onNextVideo, onPrevVideo, index }) {
    const user = UserContext();
    const [isOpenModal, setIsOpenModal] = useState(false);

    const [dataComment, setDataComment] = useState([]);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const videoRef = useRef();

    const handleOpenModal = () => {
        setIsOpenModal(true);
    };
    useEffect(() => {
        if (isOpen) {
            window.history.pushState({}, '', `/video/${data.uuid}`);
            videoRef.current.play();
        } else {
            window.history.pushState({}, '', `/`);
            videoRef.current.pause();
        }
    }, [isOpen, data]);

    useEffect(() => {
        getCommentList();
    }, [data, user]);

    const getCommentList = () => {
        user &&
            Services.getCommentsList(data.id).then((value) => {
                if (value) {
                    setIsLoading(false);
                    setDataComment(value);
                }
            });
    };

    console.log(data);
    useEffect(() => {
        isPlaying ? videoRef.current.play() : videoRef.current.pause();
    }, [isPlaying]);

    const Popper = ({ children, title }) => {
        return (
            <Tippy content={title} placement="top" offset={[0, 15]} z-Index={'99'}>
                <span> {children}</span>
            </Tippy>
        );
    };

    if (!isOpen) {
        return null;
    }

    return ReactDom.createPortal(
        <div className={cx('wrapper')}>
            {!user && <ModalAuth isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />}
            <div className={cx('container')}>
                <div className={cx('wrap-video')}>
                    <Image className={cx('img')} src={data.thumb_url} alt="avatar" />
                    <div className={cx('content-video')} onClick={() => setIsPlaying(!isPlaying)}>
                        <div className={cx('main-video')}>
                            <Video
                                classVideo={cx('video')}
                                src={data.file_url}
                                ref={videoRef}
                                loop
                                type={data.meta.file_format}
                                onClick={() => console.log(123)}
                                control={false}
                            />
                        </div>
                    </div>
                    <div className={cx('volume-control')}>
                        <VolumeVideo />
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
                    {index > 0 && (
                        <span
                            className={cx('icon', 'icon-up')}
                            onClick={() => {
                                setIsPlaying(true);
                                onPrevVideo();
                                setIsLoading(true);
                            }}
                        >
                            <UpIcon />
                        </span>
                    )}
                    <span
                        className={cx('icon', 'icon-down')}
                        onClick={() => {
                            setIsPlaying(true);
                            onNextVideo();
                            setIsLoading(true);
                        }}
                    >
                        <UpIcon />
                    </span>
                    {!isPlaying && (
                        <span className={cx('icon', 'icon-play')} onClick={() => setIsPlaying(!isPlaying)}>
                            <PlayIcon height={'80px'} width={'80px'} />
                        </span>
                    )}
                </div>

                <div className={cx('wrap-comment')}>
                    <div className={cx('user')}>
                        <SubInfoAvatar
                            interactive
                            delay={[800, 500]}
                            offset={[6, 10]}
                            placement="bottom-start"
                            data={data.user}
                            style
                        >
                            <Image className={cx('avatar')} src={data.user.avatar} alt={data.user.nickname} />
                        </SubInfoAvatar>
                        <div className={cx('info')} onClick={() => console.log(data)}>
                            <span>{data.user.first_name + ' ' + data.user.last_name}</span>
                            <p>{data.user.nickname}</p>
                        </div>
                        <span>
                            <BtnToggleFollow dataUser={data.user} />
                        </span>
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
                                <IconLikeVideo
                                    className={cx('like-icon')}
                                    data={data}
                                    isLogin={!user ? false : true}
                                    openModal={handleOpenModal}
                                >
                                    <LikeIconFull width={'18px'} height={'18px'} />
                                </IconLikeVideo>
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
                            <p>{` https://www.tiktok.com/@${data.user.nickname}/video/${data.uuid}`}</p>
                            <span>
                                <strong>Copy link</strong>
                            </span>
                        </div>
                    </div>
                    <div className={cx('view-comment')}>
                        {isLoading && (
                            <>
                                <SkeletonLoader />
                                <SkeletonLoader />
                                <SkeletonLoader />
                                <SkeletonLoader />
                            </>
                        )}
                        {user ? (
                            <>
                                {dataComment.map((data, index) => (
                                    <CommentList data={data} key={index} />
                                ))}
                            </>
                        ) : (
                            <p className={cx('loading')}>Please Login to see comments</p>
                        )}
                    </div>
                    <div className={cx('post-comment')}>
                        <div className={cx('container')}>
                            {user ? (
                                <PostComment idVideo={data.id} onPost={getCommentList} />
                            ) : (
                                <span className={cx('btn-login')} onClick={handleOpenModal}>
                                    <p>Please log in to comment</p>
                                </span>
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
