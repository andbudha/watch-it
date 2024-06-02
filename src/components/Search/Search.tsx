import { ChangeEvent, useContext } from 'react';
import { CiSearch } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import styles from './Search.module.scss';
import { DataContext } from '../../context/DataContext';

export const Search = () => {
  const { setSearchInputValue, searchInputValue } = useContext(DataContext);

  const getSearchInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.currentTarget.value);
  };
  const emptySearchInputHandler = () => {
    setSearchInputValue('');
  };
  return (
    <div className={styles.search_main_box}>
      <div className={styles.search_box}>
        <div className={styles.search_icon_box}>
          {' '}
          <CiSearch className={styles.search_icon} />
        </div>{' '}
        <input
          value={searchInputValue}
          className={styles.search_input}
          onChange={getSearchInputValueHandler}
        />
        <div className={styles.remove_icon_box}>
          {' '}
          {searchInputValue && (
            <RxCross2
              className={styles.remove_icon}
              onClick={emptySearchInputHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
};
