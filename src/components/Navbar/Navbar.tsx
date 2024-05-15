import styles from './Navbar.module.scss';

export const Navbar = () => {
  return (
    <div className={styles.nav_main_box}>
      <div className={styles.box_one}>
        <h2>Watch it!</h2>
      </div>
      <div className={styles.box_two}></div>
    </div>
  );
};
