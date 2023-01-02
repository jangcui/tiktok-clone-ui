import classNames from 'classnames/bind';
import styles from './IconVideo.module.scss';
import { useState } from 'react';
import * as Services from '~/Services/Services';

const cx = classNames.bind(styles);

function IconLikeVideo({ data, isLogin, openModal, children, className }) {
    const [likeCount, setLikeCount] = useState(data.likes_count);
    const [isLike, setIsIsLike] = useState(data.is_liked);

    const postLikeVideo = () => {
        if (isLogin) {
            setIsIsLike(true);
            setLikeCount(likeCount + 1);
            Services.likeAPost({ id: data.id })
                .then((data) => {
                    if (data) {
                        console.log(data);
                    }
                })
                .catch((error) => console.log(error));
        } else {
            openModal();
        }
    };
    const postUnLikeVideo = () => {
        setIsIsLike(false);
        setLikeCount(likeCount - 1);
        Services.unLikeAPost({ id: data.id })
            .then((data) => {
                if (data) {
                    console.log(data);
                }
            })
            .catch((error) => console.log(error));
    };
    const toggleLike = () => {
        !isLike ? postLikeVideo() : postUnLikeVideo();
    };
    return (
        <>
            <div className={cx('btn-icons', className)} onClick={toggleLike}>
                <span className={cx('icons', isLike ? 'active' : '')}>{children}</span>
            </div>
            <strong>{likeCount}</strong>
        </>
    );
}

export default IconLikeVideo;
