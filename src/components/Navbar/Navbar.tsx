import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { CiViewList, CiLogin, CiSearch } from 'react-icons/ci';
import { RiMovie2Line } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';

export const Navbar = () => {
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
          <input className={styles.search_input} />
          <div className={styles.remove_icon_box}>
            {' '}
            <RxCross2 className={styles.remove_icon} />
          </div>
        </div>
      </div>
      <div className={styles.links_box}>
        <NavLink to={''} className={styles.my_list_link_box}>
          <span className={styles.link_text}>my list</span>
          <CiViewList className={styles.list_icon} />
        </NavLink>
        <NavLink to={''} className={styles.login_link_box}>
          <span className={styles.link_text}>login</span>
          <CiLogin className={styles.login_icon} />
        </NavLink>
      </div>
    </div>
  );
};
