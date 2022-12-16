import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import IconVideo from '~/pages/Home/IconVideo';
import BtnToggleFollow from '../BtnToggleFollow';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import SubInfoAvatar from '../../component/SubInfoUser';
import Image from '../Image';
import * as Services from '~/Services/Services';
import Video from '../Video';
import classNames from 'classnames/bind';
import styles from './ContainerVideoList.module.scss';
import { Link } from 'react-router-dom';
import { CheckIcon } from '../Icons';
import ModalDetailVideo from '../ModalDetailVideo/ModalDetailVideo';
import { useEffect, useState } from 'react';
import UserContext from '../UserContext';

const cx = classNames.bind(styles);

function ContainerVideoList({ data }) {
    const [openVideo, setOpenVideo] = useState(false);
    const [dataVideo, setDataVideo] = useState([]);

    // useEffect(() => {
    //     if (openVideo) {
    //         window.history.pushState({}, '', `/video/${data.uuid}`);
    //     } else {
    //         window.history.pushState({}, '', `/`);
    //     }
    // }, [openVideo, data]);
    useEffect(() => {
        Services.getAVideo(data.id)
            .then((video) => {
                if (video) {
                    setDataVideo(video);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [data]);
    useEffect(() => {
        if (openVideo) {
            document.body.classList.add('hidden');
        } else {
            document.body.classList.remove('hidden');
        }
    }, [openVideo]);

    const handleClick = () => {
        setOpenVideo(true);
    };
    console.log(data);
    console.log(dataVideo);
    return (
        <div className={cx('container')}>
            {openVideo && (
                <ModalDetailVideo
                    data={dataVideo}
                    isOpen={openVideo}
                    onClose={() => {
                        setOpenVideo(false);
                    }}
                />
            )}
            <div className={cx('wrap-avatar')}>
                <Tippy
                    interactive
                    delay={[800, 500]}
                    placement="bottom-start"
                    zIndex={999}
                    render={(props) => {
                        return (
                            <PopperWrapper>
                                <div {...props}>
                                    <SubInfoAvatar data={data.user} style />
                                </div>
                            </PopperWrapper>
                        );
                    }}
                >
                    <Link to={`/@${data.user.nickname}`}>
                        <Image className={cx('avatar')} src={data.user.avatar} alt="lele" />
                    </Link>
                </Tippy>
            </div>
            <div className={cx('content')}>
                <div className={cx('nickname')}>
                    <Link to={`/@${data.user.nickname}`}>
                        <h3>
                            {data.user.nickname}
                            {data.user.tick && <CheckIcon className={cx('check')} />}
                        </h3>
                        <h4>{data.user.first_name + ' ' + data.user.last_name}</h4>
                    </Link>
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
                    <Video dataVideo={data.file_url} typeVideo={data.meta.file_format} onClick={handleClick} />
                    <IconVideo
                        likeCount={data.likes_count}
                        commentsCount={data.comments_count}
                        shareCount={data.shares_count}
                    />
                </div>
            </div>
            {!data.user.is_followed && (
                <div className={cx('btn')}>
                    <BtnToggleFollow dataUser={data} />
                </div>
            )}
        </div>
    );
}

export default ContainerVideoList;
