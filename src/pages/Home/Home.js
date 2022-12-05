import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Image from '~/component/Image';
import IconVideo from './IconVideo';
import Video from '~/component/Video';
import SubInfoAvatar from '../../component/SubInfoUser';
import Button from '~/component/Button';
import styles from './Home.module.scss';
import * as Services from '~/Services/Services';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '~/component/Loading';
import BtnToggleFollow from '~/component/BtnToggleFollow';

const cx = classNames.bind(styles);

function Home() {
    const [dataHome, setDataHome] = useState([]);

    const [page, setPage] = useState(Math.floor(Math.random() * 17 + 1)); ///====> vì api này chỉ có tối đa 16 trang

    const handleNextRender = () => {
        setPage(page + 1);
    };
    useEffect(() => {
        if (page >= 17 || page === 0) {
            setPage(1);
        }
        Services.getVideoList({ page: page })
            .then((data) => {
                setDataHome((preUser) => [...preUser, ...data]);
            })
            .catch((error) => console.log(error));
    }, [page]);
    console.log(page);
    return (
        <div className={cx('wrapper')}>
            <InfiniteScroll
                dataLength={dataHome.length}
                next={handleNextRender}
                hasMore={true}
                loader={
                    <div className={cx('loading')}>
                        <Loading />
                    </div>
                }
            >
                {dataHome.map((data, index) => (
                    <div className={cx('container')} key={index}>
                        <Tippy
                            interactive
                            delay={[800, 500]}
                            placement="bottom-start"
                            render={(props) => {
                                return (
                                    <div tabIndex="-1" {...props}>
                                        <PopperWrapper>
                                            <SubInfoAvatar data={data.user} style1 />
                                        </PopperWrapper>
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
                                        {data.user.tick && (
                                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                                        )}
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
                        <div className={cx('btn')}>
                            <BtnToggleFollow dataUser={data} />
                        </div>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
}

export default Home;
