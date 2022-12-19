import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import Image from '~/component/Image';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import Tippy from '@tippyjs/react/headless';

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BtnToggleFollow from '../BtnToggleFollow';
import { CheckIcon } from '../Icons';
import styles from './SubInfoAvatar.module.scss';
const cx = classNames.bind(styles);

function SubInfoAvatar({ data, style = false, children, offset = [], delay = [], interactive = true }) {
    const path = useLocation().pathname;
    const [isSmall, setIsSmall] = useState(true);
    useEffect(() => {
        if (path.indexOf('/@')) {
            setIsSmall(false);
        }
    }, [path]);

    const renderInfo = (props) => {
        return (
            <PopperWrapper>
                <div className={cx('wrapper', isSmall && 'small')} {...props}>
                    <div className={cx('header')}>
                        <Image className={cx('logo')} src={data.avatar} alt={data.first_name + data.last_name} />
                        <div
                            className={cx('btn')}
                            onClick={() => {
                                console.log(data);
                            }}
                        >
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
                    {style && <p className={cx('user-card')}>{data.bio}</p>}
                </div>
            </PopperWrapper>
        );
    };

    return (
        <>
            <Tippy
                interactive={interactive}
                placement="bottom-start"
                delay={delay}
                offset={offset}
                zIndex="9999"
                render={renderInfo}
            >
                {children}
            </Tippy>
        </>
    );
}

export default SubInfoAvatar;
