import { Wrapper as PopperWrapper } from '~/component/Popper';
import { useEffect, useState, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import AccountItems from '~/component/AccountItems';

import * as searchService from '~/apiServices/searchServices';

import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'tippy.js/dist/tippy.css';
import { useDebounce } from '~/hook';

import styles from './Search.module.scss';
import className from 'classnames/bind';
const cx = className.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchReusult, setSearchReusult] = useState([]);
  const [showReusult, setShowReusult] = useState(true);
  const [loading, setLoading] = useState(false);

  const debounced = useDebounce(searchValue, 800);

  const idValue = useRef();

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchReusult([]);
      return;
    }
    setLoading(true);

    const fetchApi = async () => {
      setLoading(true);
      const result = await searchService.search(debounced);
      setSearchReusult(result);

      setLoading(false);
    };
    fetchApi();
  }, [debounced]);

  const handleClear = () => {
    setSearchValue('');
    idValue.current.focus();
    setSearchReusult([]);
  };

  const handleHideReusult = () => {
    setShowReusult(false);
  };
  return (
    <HeadlessTippy
      interactive
      visible={showReusult && searchReusult.length > 0}
      render={(attrs) => (
        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            <h4 className={cx('search-title')}>accounts</h4>
            {searchReusult.map((result) => (
              <AccountItems key={result.id} data={result} />
            ))}
          </PopperWrapper>
        </div>
      )}
      onClickOutside={handleHideReusult}
    >
      <div className={cx('search')}>
        <input
          ref={idValue}
          value={searchValue}
          placeholder="search accounts and videos..."
          spellCheck={false}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setShowReusult(true)}
        />
        {!!searchValue && !loading && (
          <button className={cx('clear')}>
            <FontAwesomeIcon icon={faCircleXmark} onClick={handleClear} />
          </button>
        )}
        {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
        <button className={cx('search-btn')}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
