import Loading from '~/component/Loading';
import classNames from 'classnames/bind';
import styles from './Live.module.scss';
import ModalDetailVideo from '~/component/ModalDetailVideo/ModalDetailVideo';
const cx = classNames.bind(styles);
function Live() {
    return (
        <div className={cx('loading')}>
            <ModalDetailVideo />
        </div>
    );
}

export default Live;
