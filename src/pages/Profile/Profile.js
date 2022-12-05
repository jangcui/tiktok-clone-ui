import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckIcon, DotsIcon, LockIcon, ShareIcon } from '~/component/Icons';
import Image from '~/component/Image';
import * as Services from '~/Services/Services';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './Profile.module.scss';
import { useDebounce } from '~/hook';
import Loading from '~/component/Loading';
import BtnToggleFollow from '~/component/BtnToggleFollow';
const cx = classNames.bind(styles);

function Profile() {
    const [activeBtn, setActiveBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const pathName = useLocation();
    const nickName = pathName.pathname;

    const [data, setData] = useState({});

    const dataUser = useDebounce(data, 800);

    useEffect(() => {
        if (dataUser) {
            setIsLoading(false);
        }
    }, [dataUser]);
    useEffect(() => {
        setIsLoading(true);
        Services.getAnUser(nickName)
            .then((data) => {
                if (data) {
                    setData(data);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            });
    }, [nickName]);
    console.log(dataUser);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header small />
            </div>
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <Sidebar small />
                </div>
                {isLoading ? (
                    <div className={cx('loading')}>
                        <Loading />
                    </div>
                ) : (
                    <>
                        <div className={cx('content')}>
                            <div className={cx('user')}>
                                <div className={cx('main-user')}>
                                    <Image className={cx('avatar')} src={dataUser.avatar} alt="avatar" />
                                    <div className={cx('info-user')}>
                                        <h2 className={cx('nickname')}>
                                            {dataUser.nickname} {dataUser.tick && <CheckIcon className={cx('check')} />}
                                        </h2>
                                        <h4 className={cx('name')}>{dataUser.first_name + ' ' + dataUser.last_name}</h4>

                                        <div className={cx('btn')}>
                                            <BtnToggleFollow dataUser={dataUser} />
                                        </div>
                                    </div>
                                    <div className={cx('more-action')}>
                                        <span>
                                            <ShareIcon />
                                        </span>
                                        <span>
                                            <DotsIcon />
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('count-user')}>
                                    <b>{dataUser.followings_count}</b>
                                    <span>Đang Follow</span>
                                    <b>{dataUser.followers_count}</b>
                                    <span>Follower</span>
                                    <b>{dataUser.likes_count}</b>
                                    <span>Thích</span>
                                </div>
                                <div className={cx('bio-user')}>
                                    <p>{dataUser.bio === '' ? 'No bio yet' : dataUser.bio}</p>
                                </div>
                            </div>

                            <div className={cx('wrap-videos')}>
                                <div className={cx('btn-toggle')}>
                                    <span
                                        className={cx('btn-video', activeBtn && 'active-btn')}
                                        onClick={() => setActiveBtn(false)}
                                    >
                                        Video
                                    </span>
                                    <span
                                        className={cx('btn-liked', !activeBtn && 'active-btn')}
                                        onClick={() => setActiveBtn(true)}
                                    >
                                        <LockIcon /> Liked
                                    </span>
                                    <span className={cx('slider', activeBtn && 'active-slider')}></span>
                                </div>
                                {!activeBtn ? (
                                    <div className={cx('video-container')}>
                                        {dataUser.videos.map((video, index) => (
                                            <div className={cx('video-user')} key={index}>
                                                <div className={cx('video')}>
                                                    <video
                                                        src={video.file_url}
                                                        type={video.meta.file_format}
                                                        onMouseOver={(e) => {
                                                            e.target.play();
                                                        }}
                                                        muted
                                                        onMouseOut={(e) => {
                                                            e.target.pause();
                                                        }}
                                                    />
                                                    {/* <Image
                                                            className={cx('thump-img')}
                                                            src={video.thumb_url}
                                                            alt="video_user"
                                                        /> */}
                                                </div>
                                                <span className={cx('title-video')}>
                                                    <p>{video.description}</p>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className={cx('private')}>
                                        <LockIcon className={cx('private-icon')} />
                                        <h2>This user's liked videos are private</h2>
                                        <p>
                                            Videos liked by {''}
                                            <i>
                                                <b>{dataUser.nickname}</b>
                                            </i>{' '}
                                            are currently hidden
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Profile;
