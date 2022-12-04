import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import Image from '~/component/Image';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import SubInfoAvatar from '~/component/SubInfoUser';
import styles from './SuggestAccounts.module.scss';
import { Wrapper as PopperWrapper } from '../Popper';
const cx = classNames.bind(styles);

function AccountPreview({ data }) {
    const renderPreview = (props) => {
        return (
            <PopperWrapper>
                <div tabIndex="1" {...props}>
                    <SubInfoAvatar data={data} />
                </div>
            </PopperWrapper>
        );
    };
    return (
        <Tippy interactive delay={[800, 300]} offset={[-20, 0]} placement="bottom" zIndex={999} render={renderPreview}>
            <Link to={`/@${data.nickname}`}>
                <div className={cx('account-item')}>
                    <Image className={cx('avatar')} src={data.avatar} alt="kk" />
                    <div className={cx('info')}>
                        <p className={cx('nickname')}>
                            <strong>{data.nickname}</strong>
                            {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        </p>
                        <p className={cx('name')}>{data.first_name + ' ' + data.last_name}</p>
                    </div>
                </div>
            </Link>
        </Tippy>
    );
}
AccountPreview.prototype = {
    data: PropTypes.object.isRequired,
};

export default AccountPreview;
