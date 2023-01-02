import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './Following.module.scss';

import * as Services from '~/Services/Services';

import ContainerVideoList from '~/component/ContainerVideoList';

import FollowingNonLogin from './FollowingNonLogin';
import UserContext from '~/component/Contexts/UserContext/UserContext';
import Loading from '~/component/Loading';

const cx = classNames.bind(styles);

function Following() {
    const user = UserContext();

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const handleNextRender = () => {
        setPage(page + 1);
    };
    useEffect(() => {
        Services.getVideoList({ type: 'following', page: page })
            .then((data) => {
                if (data) {
                    setData((preUser) => [...preUser, ...data]);
                    console.log(data);
                }
            })
            .catch((error) => console.log(error));
    }, [page]);
    useEffect(() => {
        window.history.pushState({}, '', `/following`);
    }, []);
    return (
        <div className={cx('wrapper')}>
            {!user || data.length === 0 ? (
                <FollowingNonLogin />
            ) : (
                <InfiniteScroll
                    dataLength={data.length}
                    hasMore={true}
                    next={handleNextRender}
                    loader={
                        <div className={cx('loading')}>
                            <Loading />
                        </div>
                    }
                >
                    <ContainerVideoList dataList={data} />
                </InfiniteScroll>
            )}
        </div>
    );
}

export default Following;
