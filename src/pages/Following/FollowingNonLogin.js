import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '~/component/Loading';
import { CheckIcon } from '~/component/Icons';
import * as Services from '~/Services/Services';
import classNames from 'classnames/bind';
import styles from './Following.module.scss';
import { useEffect, useState } from 'react';
import { useDebounce } from '~/hook';
import BtnToggleFollow from '~/component/BtnToggleFollow';
const cx = classNames.bind(styles);

const RANDOM = () => Math.floor(Math.random() * 20 + 1); ///====> vì api chỉ có tất cả 20 trang thui
function FollowingNonLogin() {
    const [page, setPage] = useState(RANDOM);

    const [dataUser, setDataUser] = useState([]);
    const deBoundUser = useDebounce(dataUser, 1000);
    const handleNextRender = () => {
        setPage(page + 1);
    };
    useEffect(() => {
        if (page > 20) {
            return setPage(RANDOM);
        }
        Services.getSuggested({ page: page })
            .then((data) => {
                setDataUser((preUser) => [...preUser, ...data]);
            })
            .catch((error) => console.log(error));
    }, [page]);
    console.log(deBoundUser);
    return (
        <>
            <InfiniteScroll
                dataLength={deBoundUser.length}
                next={handleNextRender}
                hasMore={true}
                loader={
                    <div className={cx('loading')}>
                        <Loading />
                    </div>
                }
            >
                <div className={cx('container')}>
                    {deBoundUser.map(
                        (user, index) =>
                            !user.is_followed && (
                                <div className={cx('content')} key={index}>
                                    <video className={cx('video')} src={user.popular_video.file_url} />
                                    <div className={cx('user')}>
                                        <h5>{user.first_name + ' ' + user.last_name} </h5>
                                        <span>
                                            {user.nickname} {user.is_followed && <CheckIcon className={cx('tick')} />}
                                        </span>
                                        <div className={cx('btn')}>
                                            <BtnToggleFollow dataUser={user} />
                                        </div>
                                    </div>
                                </div>
                            ),
                    )}
                </div>
            </InfiniteScroll>
        </>
    );
}

export default FollowingNonLogin;
