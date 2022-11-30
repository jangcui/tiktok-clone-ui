import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
const cx = classNames.bind(styles);

function Loading() {
    return (
        <div className={cx('app')}>
            <div className={cx('loader')} />
        </div>
    );
}

export default Loading;
