import { NavLink, Navigate } from 'react-router-dom';
import styles from './Signup.module.scss';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { SignupValueTypes, SignupErrorTypes } from '../../types/common_types';
import { Loader } from '../../components/Loaders/Loader';
import { LuEye, LuEyeOff } from 'react-icons/lu';

export const Signup = () => {
  const {
    user,
    registerUser,
    isLoading,
    signupEmailInputValue,
    setSignupEmailInputValue,
    signupPasswordInputValue,
    setSignupPasswordInputValue,
  } = useContext(AuthContext);

  const [signupEmailInputError, setSignupEmailInputError] =
    useState<boolean>(false);
  const [signupPasswordInputError, setSignupPasswordInputError] =
    useState<boolean>(false);
  const [passVisibilityStatus, setPassVisibilityStatus] =
    useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const togglePassVisibilityStatusHandler = () => {
    setPassVisibilityStatus(!passVisibilityStatus);
  };

  const signupValues: SignupValueTypes = {
    email: signupEmailInputValue,
    password: signupPasswordInputValue,
  };

  const catchSignupEmailValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupEmailInputValue(e.currentTarget.value);
    if (validation.email.length > 0) {
      setSignupEmailInputError(true);
    }
  };

  const catchSignupPasswordValueHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setSignupPasswordInputValue(e.currentTarget.value);
    if (validation.password.length > 0) {
      setSignupPasswordInputError(true);
    }
  };

  const validate = (values: SignupValueTypes) => {
    const errors: SignupErrorTypes = {
      email: '',
      password: '',
    };
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Password is required!';
    } else if (values.password.length < 6) {
      errors.password = 'Must be at least 6 characters';
    }
    return errors;
  };

  const validation = validate(signupValues);

  const submitSignupValuesHandler = () => {
    if (validation.email && validation.password) {
      setSignupEmailInputError(true);
      setSignupPasswordInputError(true);
    } else if (validation.email) {
      setSignupEmailInputError(true);
    } else if (validation.password) {
      setSignupPasswordInputError(true);
    } else if (!validation.email && !validation.password) {
      registerUser(signupValues);
      setSignupEmailInputError(false);
      setSignupPasswordInputError(false);
    }
  };

  if (user) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className={styles.signup_main_box}>
      <div className={styles.signup_box}>
        {isLoading && <Loader />}
        <form className={styles.signup_form}>
          {signupEmailInputError && validation.email ? (
            <div className={styles.error_text_box}>
              <span className={styles.error_text}>{validation.email}</span>
            </div>
          ) : (
            <div className={styles.label_box}>
              <label htmlFor="email">Email Address</label>
            </div>
          )}

          <div className={styles.email_input_box}>
            <input
              className={styles.email_input}
              onChange={catchSignupEmailValueHandler}
              value={signupEmailInputValue}
              placeholder="Email..."
              type="email"
            />
          </div>

          {signupPasswordInputError && validation.password ? (
            <div className={styles.error_text_box}>
              <span className={styles.error_text}>{validation.password}</span>
            </div>
          ) : (
            <div className={styles.label_box}>
              <label htmlFor="password">Password</label>
            </div>
          )}
          <div className={styles.password_input_box}>
            <input
              className={styles.password_input}
              onChange={catchSignupPasswordValueHandler}
              value={signupPasswordInputValue}
              type={passVisibilityStatus ? 'text' : 'password'}
              placeholder="Password..."
            />
            {passVisibilityStatus ? (
              <LuEyeOff
                className={styles.eye_icon}
                onClick={togglePassVisibilityStatusHandler}
              />
            ) : (
              <LuEye
                className={styles.eye_icon}
                onClick={togglePassVisibilityStatusHandler}
              />
            )}
          </div>
          <div
            className={styles.signup_button}
            onClick={submitSignupValuesHandler}
          >
            signup
          </div>
          <div className={styles.info_box}>
            <span className={styles.info_text}>
              Already have an account?{' '}
              <NavLink to={'/login'} className={styles.login_link}>
                login
              </NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
