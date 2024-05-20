import { ReactNode, createContext, useState } from 'react';
import {
  LoginValues,
  SignupValueTypes,
  UserResponse,
} from '../assets/types/common_types';
import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { successfulToast } from '../assets/utils/successfulToast';
import { FirebaseError } from 'firebase/app';

type AuthContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  signupEmailInputValue: string;
  signupPasswordInputValue: string;
  user: UserResponse | undefined;
  registerUser: (signUpValues: SignupValueTypes) => Promise<void>;
  logInUser: (logInValues: LoginValues) => Promise<void>;
  logOutUser: () => Promise<void>;
  setSignupEmailInputValue: (newSignupEmailInputValue: string) => void;
  setSignupPasswordInputValue: (newSignupPasswordInputValue: string) => void;
};

const authInitialContextState = {
  isLoggedIn: false,
  isLoading: false,
  signupEmailInputValue: '',
  signupPasswordInputValue: '',
  user: {} as UserResponse,
  setSignupEmailInputValue: (newSignupEmailInputValue: string) =>
    newSignupEmailInputValue,
  setSignupPasswordInputValue: (newSignupPasswordInputValue: string) =>
    newSignupPasswordInputValue,
  registerUser: () => Promise.resolve(),
  logInUser: () => Promise.resolve(),
  logOutUser: () => Promise.resolve(),
} as AuthContextType;

export const AuthContext = createContext(authInitialContextState);

type AuthProviderProps = { children: ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserResponse | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [signupEmailInputValue, setSignupEmailInputValue] =
    useState<string>('');
  const [signupPasswordInputValue, setSignupPasswordInputValue] =
    useState<string>('');

  const registerUser = async (signUpValues: SignupValueTypes) => {
    setIsLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        signUpValues.email,
        signUpValues.password
      );
      if (response) {
        successfulToast('User created successfully. You can log in now.');
        setSignupEmailInputValue('');
        setSignupPasswordInputValue('');
        setUser({
          userID: auth.currentUser?.uid,
          email: auth.currentUser?.email,
        });
      }
      console.log(response);
      console.log(auth.currentUser?.email);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const logInUser = async (logInValues: LoginValues) => {
    setIsLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        logInValues.email,
        logInValues.password
      );
      console.log(response);

      if (response) {
        successfulToast('Logged in successfully!');
        setIsLoggedIn(true);
      }
    } catch (error) {
      if (error instanceof FirebaseError) console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const logOutUser = async () => {
    setIsLoading(true);
    try {
      const response = await signOut(auth);
      console.log(response);
      successfulToast('Logged out successfully!');
      setIsLoggedIn(false);
    } catch (error) {
      if (error instanceof FirebaseError) console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        registerUser,
        logInUser,
        logOutUser,
        signupEmailInputValue,
        signupPasswordInputValue,
        setSignupEmailInputValue,
        setSignupPasswordInputValue,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
