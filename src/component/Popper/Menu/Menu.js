import PropTypes from 'prop-types';
import Header from './Header';
import { useState } from 'react';
import MenuItems from './MenuItems';
import className from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import styles from './Menu.module.scss';

const cx = className.bind(styles);

const defaultfn = () => {};

function Menu({
  children,
  items = [],
  hideOnClick = false,
  onChange = defaultfn,
  placement,
  offset,
  delay,
  interactive = true,
  visible = false,
}) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1]; //lấy phần tử cuối mảng

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <MenuItems
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };

  const handleBack = () => {
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  const renderResult = (attrs) => (
    <div className={cx('content')} tabIndex="-1" {...attrs}>
      <PopperWrapper className={cx('menu-popper')}>
        {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
        <div className={cx('menu-body')}> {renderItems()}</div>
      </PopperWrapper>
    </div>
  );

  const handleReset = () => {
    setHistory((prev) => prev.slice(0, 1));
  };

  return (
    <Tippy
      interactive={interactive}
      visible={visible}
      hideOnClick={hideOnClick}
      delay={delay}
      offset={offset}
      placement={placement}
      render={renderResult}
      onHide={handleReset}
    >
      {children}
    </Tippy>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  hideOnClick: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Menu;
