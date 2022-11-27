import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import Sidebar from '../components/Sidebar';
import Button from '~/component/Button';
import { ScrollTopIcon } from '~/component/Icons';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const btnRef = useRef();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const onScroll = () => {
      window.pageYOffset === 0 ? (btnRef.current.style.bottom = '-32px') : (btnRef.current.style.bottom = '10px');
    };
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        <Sidebar />
        <div className={cx('content')}>{children}</div>
      </div>
      <div className={cx('wrap-btn')} ref={btnRef} onClick={handleScroll}>
        <Button small className={cx('download-btn')} href="/">
          down app
        </Button>
        <button className={cx('scroll-btn')}>
          <ScrollTopIcon />
        </button>
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
