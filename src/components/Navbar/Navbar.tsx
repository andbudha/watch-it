import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { CiViewList, CiLogin, CiLogout } from 'react-icons/ci';
import { RiMovie2Line } from 'react-icons/ri';
import { RiAccountBoxLine } from 'react-icons/ri';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const Navbar = () => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const logOutHandler = () => {
    logOutUser();
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
      <div className={styles.links_box}>
        {!isLoggedIn ? (
          <div className={styles.auth_box}>
            <NavLink to={'login'} className={styles.login_button_box}>
              <span className={styles.link_text}>login</span>
              <CiLogin className={styles.login_icon} />
            </NavLink>
            <NavLink to={'signup'} className={styles.signin_button_box}>
              <span className={styles.link_text}>signup</span>
              <RiAccountBoxLine className={styles.signin_icon} />
            </NavLink>
          </div>
        ) : (
          <div className={styles.nav_box}>
            <NavLink to={''} className={styles.my_list_link_main_box}>
              {isLoggedIn && (
                <div className={styles.my_list_link_box}>
                  {' '}
                  <span className={styles.link_text}>my list</span>
                  <CiViewList className={styles.list_icon} />
                </div>
              )}
            </NavLink>
            <div className={styles.logout_button_box} onClick={logOutHandler}>
              <span className={styles.link_text}>logout</span>
              <CiLogout className={styles.logout_icon} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
