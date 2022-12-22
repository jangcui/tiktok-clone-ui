import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckIcon, DotsIcon, EditIcon, LockIcon, ShareIcon, UserIcon } from '~/component/Icons';
import Image from '~/component/Image';
import * as Services from '~/Services/Services';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './Profile.module.scss';
import { useDebounce } from '~/hook';
import Loading from '~/component/Loading';
import BtnToggleFollow from '~/component/BtnToggleFollow';
import Button from '~/component/Button';
import UserContext from '~/component/UserContext/UserContext';
const cx = classNames.bind(styles);

function Profile() {
    const user = UserContext();

    const [isEditBtn, setIsEditBtn] = useState(false);
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
        if (user) {
            if (nickName === `/@${user.nickname}`) {
                setIsEditBtn(true);
            } else {
                setIsEditBtn(false);
            }
        }
    }, [nickName]);

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
                                            {isEditBtn ? (
                                                <Button text normal>
                                                    <EditIcon /> <b>Edit Profile</b>
                                                </Button>
                                            ) : (
                                                <BtnToggleFollow dataUser={dataUser} />
                                            )}
                                        </div>
                                    </div>
                                    <div className={cx('more-action')}>
                                        <span>
                                            <ShareIcon />
                                        </span>
                                        {!isEditBtn && (
                                            <span>
                                                <DotsIcon />
                                            </span>
                                        )}
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
                                        {!isEditBtn ? <LockIcon /> : <UserIcon />} Liked
                                    </span>
                                    <span className={cx('slider', activeBtn && 'active-slider')}></span>
                                </div>
                                {!activeBtn ? (
                                    <>
                                        {dataUser.videos.length !== 0 ? (
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
                                                        </div>
                                                        <span className={cx('title-video')}>
                                                            <p>{video.description}</p>
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className={cx('no-video')}>
                                                <UserIcon className={cx('icon')} />
                                                <h2>{!isEditBtn ? 'No content' : 'Upload your first video'}</h2>
                                                <p>
                                                    {!isEditBtn
                                                        ? 'This user has not published any videos.'
                                                        : 'Your videos will appear here'}
                                                </p>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className={cx('private')}>
                                        {!isEditBtn ? (
                                            <LockIcon className={cx('icon')} />
                                        ) : (
                                            <UserIcon className={cx('icon')} />
                                        )}
                                        <h2>
                                            {!isEditBtn
                                                ? `This user's liked videos are private`
                                                : 'No liked videos yet'}
                                        </h2>
                                        {!isEditBtn ? (
                                            <p>
                                                Videos liked by {''}
                                                <i>
                                                    <b>{dataUser.nickname}</b>
                                                </i>{' '}
                                                are currently hidden
                                            </p>
                                        ) : (
                                            <p>Videos you liked will appear here</p>
                                        )}
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
