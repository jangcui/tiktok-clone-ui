import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '~/component/Button';
import Image from '~/component/Image';

import styles from './SubInfoAvatar.module.scss';
const cx = classNames.bind(styles);

function SubInfoAvatar({ data, style1 = false }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image className={cx('logo')} src={data.avatar} alt={data.first_name + data.last_name} />
                <>
                    {style1 ? (
                        <Button outline className={cx('btn')}>
                            <b> Follow</b>
                        </Button>
                    ) : (
                        <Button primary className={cx('btn')}>
                            <b> Follow</b>
                        </Button>
                    )}
                </>
            </div>
            <div className={cx('acc')}>
                <a href="/" className={cx('nickname')}>
                    <span>
                        {data.nickname} {data.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />}
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
