import { NavLink } from 'react-router-dom';
import styles from './Signup.module.scss';

export const Signup = () => {
  return (
    <div className={styles.signup_main_box}>
      <div className={styles.signup_box}>
        <form className={styles.signup_form}>
          <div className={styles.label_box}>
            <label htmlFor="email">Email Address</label>
          </div>
          <div className={styles.input_box}>
            <input
              className={styles.signup_input}
              id="email"
              name="email"
              type="email"
            />
          </div>
          <div className={styles.label_box}>
            <label htmlFor="password">Password</label>
          </div>
          <div className={styles.input_box}>
            <input
              className={styles.signup_input}
              id="password"
              name="password"
              type="password"
            />
          </div>
          <button className={styles.signup_button} type="submit">
            Sign up
          </button>
          <div className={styles.info_box}>
            <span className={styles.info_text}>
              Already have an account?{' '}
              <NavLink to={'/login'} className={styles.login_link}>
                Log in
              </NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
