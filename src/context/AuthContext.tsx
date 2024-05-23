import { ReactNode, createContext, useEffect, useState } from 'react';
import {
  LoginValues,
  SignupValueTypes,
  UserResponse,
} from '../assets/types/common_types';
import { DataBase, auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { successfulToast } from '../assets/utils/successfulToast';
import { FirebaseError } from 'firebase/app';
import { generateFirebaseErrorInstance } from '../assets/utils/failedToast';
import { addDoc, collection } from 'firebase/firestore';

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
  setIsLoggedIn: (newStatus: boolean) => void;
  stayLoggedIn: () => void;
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
  setIsLoggedIn: (newStatus: boolean) => newStatus,
  stayLoggedIn: () => {
    throw new Error('An error occurred when refreshing the app page!');
  },
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

  const usersDB = collection(DataBase, 'users');
  const registerUser = async (signUpValues: SignupValueTypes) => {
    setIsLoading(true);
    try {
      const signUpResponse = await createUserWithEmailAndPassword(
        auth,
        signUpValues.email,
        signUpValues.password
      );

      if (signUpResponse) {
        await addDoc(usersDB, {
          email: auth.currentUser?.email,
          id: auth.currentUser?.uid,
          movieList: [],
        });
        successfulToast('User created successfully. You can log in now.');
        setSignupEmailInputValue('');
        setSignupPasswordInputValue('');
        setUser({
          userID: auth.currentUser?.uid,
          email: auth.currentUser?.email,
        });
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error);
        generateFirebaseErrorInstance(error);
      }
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

      if (response) {
        successfulToast('Logged in successfully!');
        setIsLoggedIn(true);
        setUser({ email: response.user.email, userID: response.user.uid });
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error);
        generateFirebaseErrorInstance(error);
      }
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
      if (error instanceof FirebaseError) {
        console.log(error);
        generateFirebaseErrorInstance(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const stayLoggedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);

        setIsLoggedIn(true);
        // ...
      } else {
        setIsLoggedIn(false);
      }
    });
  };

  // useEffect(() => {
  //   stayLoggedIn();
  // }, []);
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
        setIsLoggedIn,
        stayLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
