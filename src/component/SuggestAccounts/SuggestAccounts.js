import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestAccounts.module.scss';
import AccountPreview from './AccountPreview';
import { Link } from 'react-router-dom';
import config from '~/config';
const cx = classNames.bind(styles);

function SuggestAccounts({ label, data = [] }) {
    return (
        <Link to={config.routes.profile}>
            <div className={cx('wrapper')}>
                <p className={cx('label')}>{label}</p>
                {data.map((account, index) => (
                    <AccountPreview key={index} data={account} />
                ))}
                <p className={cx('more-btn')}>see all</p>
            </div>
        </Link>
    );
}
SuggestAccounts.prototype = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
    onViewChange: PropTypes.func,
};
export default SuggestAccounts;
