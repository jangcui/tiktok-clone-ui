import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import IconVideo from '~/pages/Home/IconVideo';
import BtnToggleFollow from '../BtnToggleFollow';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import SubInfoAvatar from '../../component/SubInfoUser';
import Image from '../Image';
import Video from '../Video';
import classNames from 'classnames/bind';
import styles from './ContainerVideoList.module.scss';

const cx = classNames.bind(styles);

function ContainerVideoList({ data }) {
    console.log(data);
    return (
        <div>
            {data &&
                data.map((data, index) => (
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
        </div>
    );
}

export default ContainerVideoList;
