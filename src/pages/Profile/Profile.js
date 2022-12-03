import classNames from 'classnames/bind';
import Button from '~/component/Button';
import Image from '~/component/Image';
import Video from '~/component/Video';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './Profile.module.scss';
const cx = classNames.bind(styles);

function Profile() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header small />
            </div>
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <Sidebar small />
                </div>
                <div className={cx('content')}>
                    <div className={cx('user')}>
                        <div className={cx('main-user')}>
                            <Image
                                className={cx('avatar')}
                                src="https://files.fullstack.edu.vn/f8-tiktok/users/211/63667b3246f40.jpg"
                                alt="hehe"
                            />
                            <div className={cx('info-user')}>
                                <h2 className={cx('nickname')}>
                                    nick name <span>icon check</span>
                                </h2>
                                <h1 className={cx('name')}>name</h1>
                                <Button primary>follow</Button>
                            </div>
                            <div className={cx('btn')}>btn share</div>
                        </div>
                        <div className={cx('count-user')}>
                            <b>12</b>
                            <span>Đang Follow</span>
                            <b>1874</b>
                            <span>Follower</span>
                            <b>62.9K</b>
                            <span>Thích</span>
                        </div>
                        <div className={cx('bio-user')}>
                            <p>bio w/o the o 🫶🏽 snap: Manaia.simeonnn gone ghost.</p>
                        </div>
                    </div>

                    <div className={cx('wrap-videos')}>
                        <div className={cx('btn-toggle')}>
                            <span>video</span>
                            <span>liked</span>
                        </div>
                        <div className={cx('video-list')}>
                            <div className={cx('video')}>
                                <Video
                                    dataVideo={'https://files.fullstack.edu.vn/f8-tiktok/videos/548-635be861c0068.mp4'}
                                    isIcon
                                    onMouseOver={(e) => console.log(e)}
                                />
                            </div>
                            <span className={cx('title-video')}>another vlog for you #fy</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
