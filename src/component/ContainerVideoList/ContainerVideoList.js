import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconVideo from '~/pages/Home/IconVideo';
import BtnToggleFollow from '../BtnToggleFollow';
import SubInfoAvatar from '../../component/SubInfoUser';
import Image from '../Image';
import * as Services from '~/Services/Services';
import Video from '../Video';
import classNames from 'classnames/bind';
import styles from './ContainerVideoList.module.scss';
import { Link } from 'react-router-dom';
import { CheckIcon } from '../Icons';
import ModalDetailVideo from '../ModalDetailVideo/ModalDetailVideo';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const cx = classNames.bind(styles);

function ContainerVideoList({ data }) {
    const { ref, inView } = useInView({
        threshold: 0.8,
    });
    const [view, setView] = useState(true);
    const [openVideo, setOpenVideo] = useState(false);
    const [dataVideo, setDataVideo] = useState([]);
    const videoRef = useRef();

    useEffect(() => {
        if (openVideo) {
            window.history.pushState({}, '', `/video/${data.uuid}`);
        } else {
            window.history.pushState({}, '', `/`);
        }
    }, [openVideo, data]);

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
        setView(inView);
    }, [inView]);
    useEffect(() => {
        if (openVideo) {
            document.body.classList.add('hidden1');
        } else {
            document.body.classList.remove('hidden1');
        }
    }, [openVideo]);
    const handleClick = () => {
        setOpenVideo(true);
        setView(false);
    };

    return (
        <div className={cx('container')}>
            {openVideo && (
                <ModalDetailVideo
                    data={dataVideo}
                    isOpen={openVideo}
                    onClose={() => {
                        videoRef.current.play();
                        setView(true);
                        setOpenVideo(false);
                    }}
                />
            )}
            <div className={cx('wrap-avatar')}>
                <SubInfoAvatar delay={[800, 500]} data={data.user} offset={[-20, 0]} style>
                    <Link to={`/@${data.user.nickname}`}>
                        <Image className={cx('avatar')} src={data.user.avatar} alt="lele" />
                    </Link>
                </SubInfoAvatar>
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
                    <div className={cx('wrap-video')} ref={ref}>
                        <Video
                            dataVideo={data.file_url}
                            typeVideo={data.meta.file_format}
                            onClick={handleClick}
                            classVideo={cx('video')}
                            ref={videoRef}
                            inView={view}
                        />
                    </div>
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
