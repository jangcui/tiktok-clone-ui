import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import IconVideo from '~/pages/Home/IconVideo';
import SubInfoAvatar from '../../component/SubInfoUser';
import BtnToggleFollow from '../BtnToggleFollow';
import { CheckIcon } from '../Icons';
import Image from '../Image';
import ModalDetailVideo from '../ModalDetailVideo/ModalDetailVideo';
import * as Services from '~/Services/Services';

import Video from '../Video';
import styles from './ContainerVideoList.module.scss';

const cx = classNames.bind(styles);

function ContainerVideoList({ dataList }) {
    const [openVideo, setOpenVideo] = useState(false);
    const [dataVideo, setDataVideo] = useState([]);

    const [index, setIndex] = useState(0);
    const videoRef = useRef();
    const myRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (openVideo) {
            videoRef.current.pause();
        }
    }, [openVideo]);
    useEffect(() => {
        if (openVideo) {
            document.body.classList.add('hidden1');
        } else {
            document.body.classList.remove('hidden1');
            window.history.pushState({}, '', `/`);
        }
    }, [openVideo]);

    const handleClick = (e, key) => {
        setOpenVideo(true);
        setIndex(key);
        setDataVideo(dataList[key]);
    };

    const handleNextVideo = () => {
        setIndex((prev) => prev + 1);
        setDataVideo(dataList[index + 1]);
        console.log('key index: ', index);
        executeScroll();
    };
    const handlePrevVideo = () => {
        setIndex((prev) => prev - 1);
        setDataVideo(dataList[index - 1]);
        console.log('key index: ', index);
        executeScrollDown();
    };
    const executeScroll = () => {
        console.log(scrollRef.current.clientHeight);
        let i = index;
        window.scrollTo({
            top: scrollRef.current.clientHeight * (i + 1) - 24,
        });
    };
    const executeScrollDown = () => {
        let i = index;
        window.scrollTo({
            top: scrollRef.current.clientHeight * (i - 1) - 24,
        });
    };

    return (
        <>
            {openVideo && (
                <ModalDetailVideo
                    data={dataVideo}
                    isOpen={openVideo}
                    onNextVideo={() => handleNextVideo()}
                    onPrevVideo={() => handlePrevVideo()}
                    index={index}
                    onClose={() => {
                        setOpenVideo(false);
                    }}
                />
            )}
            {dataList.map((data, index) => (
                <div
                    className={cx('container')}
                    key={index}
                    ref={scrollRef}
                    onClick={(e) => {
                        console.log(e.target.offsetTop);
                    }}
                >
                    <div className={cx('wrap-avatar')}>
                        <SubInfoAvatar delay={[800, 500]} data={data.user} offset={[-20, 0]} style>
                            <Link to={`/@${data.user.nickname}`}>
                                <Image className={cx('avatar')} src={data.user.avatar} alt="hehe" />
                            </Link>
                        </SubInfoAvatar>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('nickname')}>
                            {/* <Link to={`/@${data.user.nickname}`}> */}
                            <h3>
                                {data.user.nickname}
                                {data.user.tick && <CheckIcon className={cx('check')} />}
                            </h3>
                            <h4>{data.user.first_name + ' ' + data.user.last_name}</h4>
                            {/* </Link> */}
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
                            <div className={cx('wrap-video')} ref={myRef}>
                                <Video
                                    dataVideo={data.file_url}
                                    typeVideo={data.meta.file_format}
                                    onClick={() => handleClick(data, index)}
                                    classVideo={cx('video')}
                                    ref={videoRef}
                                    seekBar
                                />
                            </div>
                            <IconVideo
                                // onLike={() => handleLikeVideo(data.id)}
                                data={data}
                                onOpenCmt={() => handleClick(data, index)}
                            />
                        </div>
                    </div>
                    {!data.user.is_followed && (
                        <div className={cx('btn')}>
                            <BtnToggleFollow dataUser={data} />
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}

export default ContainerVideoList;
