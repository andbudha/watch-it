import { ReactNode, createContext, useState } from 'react';
import { SignupValueTypes, UserResponse } from '../assets/types/common_types';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

type AuthContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: UserResponse | undefined;
  registerUser: (signUpValues: SignupValueTypes) => Promise<void>;
};

const authInitialContextState = {
  isLoggedIn: false,
  isLoading: false,
  user: {} as UserResponse,
  registerUser: () => Promise.resolve(),
} as AuthContextType;

export const AuthContext = createContext(authInitialContextState);

type AuthProviderProps = { children: ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserResponse | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const registerUser = async (signUpValues: SignupValueTypes) => {
    try {
      setIsLoading(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        signUpValues.email,
        signUpValues.password
      );
      if (response) {
        setUser({
          userID: auth.currentUser?.uid,
          email: auth.currentUser?.email,
        });
        alert('User successfully created!');
      }
      console.log(response);
      console.log(auth.currentUser?.email);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};
