import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import Image from '~/component/Image';

import styles from './SubInfoAvatar.module.scss';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BtnToggleFollow from '../BtnToggleFollow';
import { CheckIcon } from '../Icons';
const cx = classNames.bind(styles);

function SubInfoAvatar({ data, style1 = false }) {
    const path = useLocation().pathname;
    const [isSmall, setIsSmall] = useState(true);
    useEffect(() => {
        if (path.indexOf('/@')) {
            setIsSmall(false);
        }
    }, [path]);

    return (
        <div className={cx('wrapper', isSmall && 'small')}>
            <div className={cx('header')}>
                <Image className={cx('logo')} src={data.avatar} alt={data.first_name + data.last_name} />
                <div className={cx('btn')}>
                    <BtnToggleFollow dataUser={data} />
                </div>
            </div>
            <Link to={`/@${data.nickname}`}>
                <span className={cx('nickname')}>
                    {data.nickname} {data.tick && <CheckIcon className={cx('check')} />}
                </span>
            </Link>
            <span>{data.first_name + ' ' + data.last_name}</span>
            <div className={cx('follow')}>
                <b>{data.followers_count}</b>
                <span>Follower</span>
                <b>{data.likes_count}</b>
                <span>Likes</span>
            </div>
            {style1 && <p className={cx('user-card')}>{data.bio}</p>}
        </div>
    );
}

export default SubInfoAvatar;
