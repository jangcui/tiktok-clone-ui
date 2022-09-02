import PropTypes from 'prop-types';

import Image from '~/component/Image';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import SubInfoAvatar from '~/component/SubInfoUser';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import styles from './SuggestAccounts.module.scss';
const cx = classNames.bind(styles);

function AccountItem({ data }) {
  return (
    <Tippy
      interactive
      delay={[1000, 300]}
      render={(attrs) => (
        <div tabIndex="-1" {...attrs}>
          <SubInfoAvatar data={data} />
        </div>
      )}
      placement="bottom"
    >
      <div className={cx('account-item')}>
        <Image className={cx('avatar')} src={data.avatar} alt="kk" />
        <div className={cx('item-info')}>
          <p className={cx('nickname')}>
            <strong>{data.nickname}</strong>
            {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
          </p>
          <p className={cx('name')}>{data.first_name + ' ' + data.last_name}</p>
        </div>
      </div>
    </Tippy>
  );
}
AccountItem.prototype = {
  data: PropTypes.object.isRequired,
};

export default AccountItem;
