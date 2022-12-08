import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './Following.module.scss';

import * as Services from '~/Services/Services';

import ContainerVideoList from '~/component/ContainerVideoList';
import UserContext from '~/component/UserContext';
import { useDebounce } from '~/hook';
import FollowingNonLogin from './FollowingNonLogin';

const cx = classNames.bind(styles);

function Following() {
    const user = UserContext();

    const [dataFollow, setDataFollow] = useState([]);
    const deBoundFollowing = useDebounce(dataFollow, 800);

    useEffect(() => {
        Services.getVideoList({ type: 'following' })
            .then((data) => {
                if (data) {
                    setDataFollow((preUser) => [...preUser, ...data]);
                }
            })
            .catch((error) => console.log(error));
    }, []);
    console.log(dataFollow.length);
    return (
        <div className={cx('wrapper')}>
            {!user || dataFollow.length === 0 ? (
                <FollowingNonLogin />
            ) : (
                <InfiniteScroll
                    dataLength={dataFollow.length}
                    endMessage={
                        <p className={cx('message')}>
                            <b>There are no more videos to show.</b>
                        </p>
                    }
                >
                    <ContainerVideoList data={deBoundFollowing} />
                </InfiniteScroll>
            )}
        </div>
    );
}

export default Following;
