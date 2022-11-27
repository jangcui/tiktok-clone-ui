import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '~/component/Button';
import Image from '~/component/Image';

import styles from './SubInfoAvatar.module.scss';
const cx = classNames.bind(styles);

function SubInfoAvatar({ data, style1 = false, children, offset = [], delay = [] }) {
  return (
<<<<<<< HEAD
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <Image className={cx('logo')} src={data.avatar} alt={data.first_name + data.last_name} />

        <>
          {style1 ? (
            <Button outline className={cx('btn')}>
              Follow
            </Button>
          ) : (
            <Button primary className={cx('btn')}>
              Follow
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
        <span>{data.followers_count}</span>
        <span>Follower</span>
        <span>{data.likes_count}</span>
        <span>Like</span>
      </div>
      {style1 && <p className={cx('user-card')}>{data.bio}</p>}
    </div>
=======
    <>
      <Tippy
        interactive
        offset={offset}
        delay={delay}
        placement="bottom"
        render={(attrs) => (
          <div tabIndex="-1" {...attrs}>
            <div className={cx('wrapper')}>
              <div className={cx('header')}>
                <Image className={cx('logo')} src={data.avatar} alt={data.first_name + data.last_name} />
                <>
                  {style1 ? (
                    <Button outline className={cx('btn')} title="Follow" />
                  ) : (
                    <Button primary className={cx('btn')} title="Follow" />
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
                <span>{data.followers_count}</span>
                <span>Follower</span>
                <span>{data.likes_count}</span>
                <span>Thích</span>
              </div>
              {style1 && <p className={cx('user-card')}>{data.bio}</p>}
            </div>
          </div>
        )}
      >
        {children}
      </Tippy>
    </>
>>>>>>> d6f69fef05ba359894ba3593f4ae013b319f9907
  );
}

export default SubInfoAvatar;
