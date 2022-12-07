import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import * as Services from '~/Services/Services';
import styles from './Home.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import ContainerVideoList from '~/component/ContainerVideoList';
import Loading from '~/component/Loading';

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
    console.log(dataHome);
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
                <ContainerVideoList data={dataHome} />
            </InfiniteScroll>
        </div>
    );
}

export default Home;
