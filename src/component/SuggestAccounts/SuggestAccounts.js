import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SuggestAccounts({ label, data = [] }) {
  return (
    <div className={cx('wrapper')}>
      <p className={cx('label')}>{label}</p>
      {data.map((account) => (
        <AccountItem key={account.id} data={account} />
      ))}

      <p className={cx('more-btn')}>see all</p>
    </div>
  );
}
SuggestAccounts.prototype = {
  label: PropTypes.string.isRequired,
  data: PropTypes.array,
  onViewChange: PropTypes.func,
};
export default SuggestAccounts;
