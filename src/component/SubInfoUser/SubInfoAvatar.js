import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '~/component/Button';
import Image from '~/component/Image';

import styles from './SubInfoAvatar.module.scss';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
            <div className={cx('acc')}>
                <a href="/" className={cx('nickname')}>
                    <span>
                        {data.nickname} {data.tick && <CheckIcon className={cx('check')} />}
                    </span>
                </a>
                <br />

                <span>{data.first_name + ' ' + data.last_name}</span>
            </div>
            <div className={cx('follow')}>
                <b className={cx('count')}>{data.followers_count}</b>
                <span>Follower</span>
                <b className={cx('count')}>{data.likes_count}</b>
                <span>Thích</span>
            </div>
            {style1 && <p className={cx('user-card')}>{data.bio}</p>}
        </div>
    );
}

export default SubInfoAvatar;
