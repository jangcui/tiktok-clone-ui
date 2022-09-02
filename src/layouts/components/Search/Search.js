import { Wrapper as PopperWrapper } from '~/component/Popper';
import { useEffect, useState, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import AccountItems from '~/component/AccountItems';

import * as searchService from '~/Services/searchService';

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
  const [showReusult, setShowReusult] = useState(false);
  const [loading, setLoading] = useState(false);

  const debouncedValue = useDebounce(searchValue, 800);

  const idValue = useRef();

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchReusult([]);
      return;
    }
    setLoading(true);

    const fetchApi = async () => {
      setLoading(true);
      const result = await searchService.search(debouncedValue);
      setSearchReusult(result);

      setLoading(false);
    };
    fetchApi();
  }, [debouncedValue]);

  const handleClear = () => {
    setSearchValue('');
    idValue.current.focus();
    setSearchReusult([]);
  };

  const handleHideReusult = () => {
    setShowReusult(false);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  return (
    // dùng thẻ này cho đỡ warning
    <div>
      <HeadlessTippy
        interactive
        appendTo={() => document.body}
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
            onChange={handleChange}
            onFocus={() => setShowReusult(true)}
          />
          {!!searchValue && !loading && (
            <button className={cx('clear')}>
              <FontAwesomeIcon icon={faCircleXmark} onClick={handleClear} />
            </button>
          )}
          {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

          <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
