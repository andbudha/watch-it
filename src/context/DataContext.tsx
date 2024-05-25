import { ReactNode, createContext, useState } from 'react';
import { Movies } from '../assets/types/common_types';
import { auth, dataBase } from '../config/firebase';
import {
  DocumentReference,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import axios from 'axios';

type MovieToAddType = {
  title?: string;
  year?: number;
  userID?: string;
  thumbnail?: string;
  id?: string;
};
type DataContextType = {
  usersCollection: CollectionUser[] | null;
  getUsers: () => Promise<void>;
  movies: Movies | null;
  fetchMovies: () => Promise<void>;
  addMovieToMyList: (newMovie: MovieToAddType) => Promise<void>;
  removeMovieFromMyList: (movie: MovieToAddType) => Promise<void>;
};

type CollectionUser = {
  email: string;
  id: string;
  movieList: MovieToAddType[];
};

type DataProviderProps = { children: ReactNode };

const initialDataContextState = {
  usersCollection: [] as CollectionUser[],
  getUsers: () => Promise.resolve(),
  movies: [] as Movies,
  fetchMovies: () => Promise.resolve(),
  addMovieToMyList: () => Promise.resolve(),
  removeMovieFromMyList: () => Promise.resolve(),
} as DataContextType;

export const DataContext = createContext(initialDataContextState);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [movies, setMovies] = useState<null | Movies>(null);
  const [usersCollection, setUsersCollection] = useState<
    CollectionUser[] | null
  >(null);

  // const localData = '../../data/movies.json';
  const fetchMovies = async () => {
    const response = await axios.get<Movies>(
      'https://5b81e3264853b358.mokky.dev/mixedmovies'
    );
    if (response) {
      setMovies(response.data.slice(0, 10));
    }
  };

  const usersList = collection(dataBase, 'users');

  const getUsers = async () => {
    try {
      const response = await getDocs(usersList);
      const data = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (data) {
        setUsersCollection(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let movieListRef: DocumentReference<unknown, {}>;
  if (auth.currentUser) {
    movieListRef = doc(dataBase, 'users', auth.currentUser.uid);
  }

  const addMovieToMyList = async (newMovie: MovieToAddType) => {
    try {
      await updateDoc(movieListRef, {
        movieList: arrayUnion(newMovie),
      });
    } catch (error) {}
  };

  const removeMovieFromMyList = async (movie: MovieToAddType) => {
    try {
      await updateDoc(movieListRef, {
        movieList: arrayRemove(movie),
      });
    } catch (error) {}
  };

  return (
    <DataContext.Provider
      value={{
        usersCollection,
        getUsers,
        fetchMovies,
        movies,
        addMovieToMyList,
        removeMovieFromMyList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
