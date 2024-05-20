import { NavLink } from 'react-router-dom';
import styles from './MyList.module.scss';
import { IoChevronBack } from 'react-icons/io5';
export const MyList = () => {
  return (
    <div className={styles.mylist_main_box}>
      <div className={styles.mylist_box}>
        <div className={styles.mylist_info_box}>
          {' '}
          <h1>This List Is Currently Empty</h1>
          <h2>Add movies to your list</h2>
          <NavLink className={styles.grid_movies_button} to={'/'}>
            {' '}
            <IoChevronBack className={styles.chevron_icon} />
            main
          </NavLink>
        </div>
      </div>
    </div>
  );
};
