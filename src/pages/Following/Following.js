import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Button from '~/component/Button';
import styles from './Following.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';

import * as Services from '~/Services/Services';
import Loading from '~/component/Loading';
import { CheckIcon } from '~/component/Icons';
import { useDebounce } from '~/hook';
import ContainerVideoList from '~/component/ContainerVideoList';

const cx = classNames.bind(styles);

const RANDOM = () => Math.floor(Math.random() * 20 + 1); ///====> vì api chỉ có tất cả 20 trang thui
function Following() {
    const [page, setPage] = useState(RANDOM);

    const [dataUser, setDataUser] = useState([]);
    // const deBoundUser = useDebounce(dataUser, 600);
    const [dataFollow, setDataFollow] = useState([]);

    // const handleNextRender = () => {
    //     setPage(page + 1);
    // };
    useEffect(() => {
        if (page > 20) {
            return setPage(RANDOM);
        }
        Services.getSuggested({ page: page, perPage: dataUser.length })
            .then((data) => {
                setDataUser((preUser) => [...preUser, ...data]);
            })
            .catch((error) => console.log(error));
    }, [page]);

    useEffect(() => {
        Services.getFollowList({ page: 2 })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => console.log(error));
    }, [page]);
    console.log(dataFollow);
    return (
        <div className={cx('wrapper')}>
            <ContainerVideoList data={dataFollow} />
        </div>
        // <div className={cx('wrapper')}>
        //     <InfiniteScroll
        //         dataLength={deBoundUser.length}
        //         next={handleNextRender}
        //         hasMore={true}
        //         loader={
        //             <div className={cx('loading')}>
        //                 <Loading />
        //             </div>
        //         }
        //     >
        //         <div className={cx('container')}>
        //             {deBoundUser.map(
        //                 (user, index) =>
        //                     !user.is_followed && (
        //                         <div className={cx('content')} key={index}>
        //                             <video className={cx('video')} src={user.popular_video.file_url} />
        //                             <div className={cx('user')}>
        //                                 <h5>{user.first_name + ' ' + user.last_name} </h5>
        //                                 <span>
        //                                     {user.nickname} {user.is_followed && <CheckIcon className={cx('tick')} />}
        //                                 </span>
        //                                 <Button primary className={cx('btn')}>
        //                                     <b> Follow</b>
        //                                 </Button>
        //                             </div>
        //                         </div>
        //                     ),
        //             )}
        //         </div>
        //     </InfiniteScroll>
        // </div>
    );
}

export default Following;
