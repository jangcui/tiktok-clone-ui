import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Image from '~/component/Image';
import IconVideo from './IconVideo';
import Video from '~/component/Video';
import SubInfoAvatar from '../../component/SubInfoUser';
import Button from '~/component/Button';
import styles from './Home.module.scss';
import * as dataHomeService from '~/Services/dataHomeService';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
 
function Home() {
  const [dataHome, setDataHome] = useState([]);

  useEffect(() => {
    dataHomeService
      .getSuggested({ page: 2 })
      .then((data) => {
        setDataHome((preUser) => [...preUser, ...data]);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className={cx('wrapper')}>
      {dataHome.map((data) => (
        <div className={cx('container')} key={data.id}>
          <Tippy
            interactive
            visible
            delay={[800, 500]}
            placement="bottom-start"
            render={(props) => {
              return (
                <div tabIndex="-1" {...props}>
                  <div>
                    <SubInfoAvatar data={data.user} style1 />
                  </div>
                </div>
              );
            }}
          >
            <div className={cx('wrap-avatar')}>
              <Image className={cx('avatar')} src={data.user.avatar} alt="lele" />
            </div>
          </Tippy>
          <div className={cx('content')}>
            <div className={cx('nickname')}>
              <a href=".">
                <h3>
                  {data.user.nickname}
                  {data.user.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </h3>
                <h4>{data.user.first_name + ' ' + data.user.last_name}</h4>
              </a>
            </div>
            <div className={cx('status')}>
              <span>
                {data.description}
                <strong> {data.user.bio}</strong>
              </span>
            </div>

            <div className={cx('name-song')}>
              <a href=".">
                <FontAwesomeIcon icon={faMusic} className={cx('sound')} />
                <strong>{data.music}</strong>
              </a>
            </div>
            <div className={cx('video-wrapper')}>
              <Video dataVideo={data.file_url} typeVideo={data.meta.file_format} />
              <IconVideo
                likeCount={data.likes_count}
                commentsCount={data.comments_count}
                shareCount={data.shares_count}
              />
            </div>
          </div>
          <Button outline className={cx('btn-outline')}>
            Follow
          </Button>
        </div>
      ))}
    </div>
  );
}

export default Home;
