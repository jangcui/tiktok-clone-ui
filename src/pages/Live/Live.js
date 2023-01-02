import Loading from '~/component/Loading';
import classNames from 'classnames/bind';
import styles from './Live.module.scss';
const cx = classNames.bind(styles);
function Live() {
    return (
        <div className={cx('loading')}>
            <Loading />
        </div>
    );
}

export default Live;
