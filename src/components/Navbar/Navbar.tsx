import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { CiViewList, CiLogin, CiSearch, CiLogout } from 'react-icons/ci';
import { RiMovie2Line } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import { ChangeEvent, useState } from 'react';

type NavbarProps = {
  loggedIn: boolean;
  setLoggedIn: (loggedStatus: boolean) => void;
};
export const Navbar = ({ loggedIn, setLoggedIn }: NavbarProps) => {
  const [searchInputValue, setSearchInputValue] = useState<string>('');

  const getSearchInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.currentTarget.value);
  };
  const emptySearchInputHandler = () => {
    setSearchInputValue('');
  };

  const logOutHandler = () => {
    setLoggedIn(false);
  };
  return (
    <div className={styles.nav_main_box}>
      <NavLink to={'/'} className={styles.home_page_link_box}>
        <RiMovie2Line className={styles.logo_icon} />
        <div className={styles.logo_text_box}>
          {' '}
          <span className={styles.logo_text}>.watch..it</span>
        </div>
      </NavLink>

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
      <div className={styles.links_box}>
        <NavLink to={''} className={styles.my_list_link_main_box}>
          {loggedIn && (
            <div className={styles.my_list_link_box}>
              {' '}
              <span className={styles.link_text}>my list</span>
              <CiViewList className={styles.list_icon} />
            </div>
          )}
        </NavLink>
        {!loggedIn ? (
          <NavLink to={''} className={styles.login_button_box}>
            <span className={styles.link_text}>login</span>
            <CiLogin className={styles.login_icon} />
          </NavLink>
        ) : (
          <div className={styles.logout_button_box} onClick={logOutHandler}>
            <span className={styles.link_text}>logout</span>
            <CiLogout className={styles.logout_icon} />
          </div>
        )}
      </div>
    </div>
  );
};
