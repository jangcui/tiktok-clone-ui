import classNames from 'classnames/bind';
import styles from './SkeletonLoader.module.scss';

const cx = classNames.bind(styles);

function SkeletonLoader() {
    return (
        <div className={cx('skeleton')}>
            <span className={cx('skeleton-avatar', 'loading')}></span>
            <div className={cx('skeleton-content')}>
                <span className={cx('skeleton-name', 'loading')}></span>
                <span className={cx('skeleton-title', 'loading')}></span>
                <span className={cx('skeleton-sub', 'loading')}></span>
            </div>
        </div>
    );
}

export default SkeletonLoader;
