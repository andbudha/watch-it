import { NavLink } from 'react-router-dom';
import styles from './Signup.module.scss';
import { ChangeEvent, useState } from 'react';

export const Signup = () => {
  const [signupEmailInputValue, setSignupEmailInputValue] =
    useState<string>('');
  const [signupPasswordInputValue, setSignupPasswordInputValue] =
    useState<string>('');

  const catchSignupEmailValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupEmailInputValue(e.currentTarget.value);
  };

  const catchSignupPasswordValueHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setSignupPasswordInputValue(e.currentTarget.value);
  };

  const submitSignupValuesHandler = () => {
    const signupValues = {
      email: signupEmailInputValue,
      password: signupPasswordInputValue,
    };
    console.log(signupValues);
  };
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
              onChange={catchSignupEmailValueHandler}
              value={signupEmailInputValue}
              type="email"
            />
          </div>
          <div className={styles.label_box}>
            <label htmlFor="password">Password</label>
          </div>
          <div className={styles.input_box}>
            <input
              className={styles.signup_input}
              onChange={catchSignupPasswordValueHandler}
              value={signupPasswordInputValue}
              type="password"
            />
          </div>
          <div
            className={styles.signup_button}
            onClick={submitSignupValuesHandler}
          >
            Sign up
          </div>
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
