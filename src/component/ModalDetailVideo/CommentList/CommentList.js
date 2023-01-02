import classNames from 'classnames/bind';
import { useState } from 'react';
import { DotsIcon, LikeIcon, LikeIconActive } from '~/component/Icons';
import Image from '~/component/Image';
import SubInfoAvatar from '~/component/SubInfoUser/SubInfoAvatar';
import styles from './CommentList.module.scss';
import * as Services from '~/Services/Services';
const cx = classNames.bind(styles);

function CommentList({ data }) {
    const [likeCount, setLikeCount] = useState(data.likes_count);
    const [isLike, setIsLike] = useState(data.is_liked);

    const handleLikeComment = () => {
        setLikeCount(likeCount + 1);
        setIsLike(true);
        Services.likeComment(data.id)
            .then((e) => {
                console.log(e);
            })
            .catch((e) => console.log(e));
    };
    const handleUnLikeComment = () => {
        setLikeCount(likeCount - 1);
        setIsLike(false);
        Services.unLikeComment(data.id)
            .then((e) => {
                console.log(e);
            })
            .catch((e) => console.log(e));
    };

    return (
        <div className={cx('wrapper')}>
            <SubInfoAvatar
                interactive
                delay={[800, 500]}
                offset={[6, 10]}
                placement="bottom-start"
                data={data.user}
                style
            >
                <Image src={data.user.avatar} className={cx('avatar')} />
            </SubInfoAvatar>
            <div className={cx('main-comment')}>
                <span className={cx('name-user')}>{data.user.first_name + ' ' + data.user.last_name} </span>
                <p className={cx('comment-text')}>{data.comment}</p>
                <span className={cx('sub-comment')}>
                    {data.updated_at} <b>Rep</b>
                </span>
            </div>
            <div className={cx('like-comment')}>
                <DotsIcon className={cx('dot-icon')} width={'24px'} height={'24px'} />
                <span className={cx('btn-like')}>
                    <span onClick={!isLike ? handleLikeComment : handleUnLikeComment}>
                        {isLike ? (
                            <LikeIconActive className={cx('active')} width={'20px'} height={'20px'} />
                        ) : (
                            <LikeIcon width={'20px'} height={'20px'} />
                        )}
                    </span>
                    <span className={cx('count')}>{likeCount}</span>
                </span>
            </div>
        </div>
    );
}

export default CommentList;
