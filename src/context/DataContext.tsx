import { ReactNode, createContext, useState } from 'react';
import { ListMovieType, Movies } from '../assets/types/common_types';
import { DataBase } from '../config/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import axios from 'axios';

type NewMovieToAddType = {
  title?: string;
  year?: number;
  userID?: string;
};
type DataContextType = {
  fireStoreMovieList: ListMovieType[] | null;
  getMovieList: () => Promise<void>;
  getUsers: () => Promise<void>;
  movies: Movies | null;
  fetchMovies: () => Promise<void>;
  addMovieToMyList: (newMovie: NewMovieToAddType) => Promise<void>;
  deleteItemFromMyList: (movieID: string) => Promise<void>;
};

type DataProviderProps = { children: ReactNode };

const initialDataContextState = {
  fireStoreMovieList: [] as ListMovieType[],
  getMovieList: () => Promise.resolve(),
  getUsers: () => Promise.resolve(),
  movies: [] as Movies,
  fetchMovies: () => Promise.resolve(),
  addMovieToMyList: () => Promise.resolve(),
  deleteItemFromMyList: () => Promise.resolve(),
} as DataContextType;

export const DataContext = createContext(initialDataContextState);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [movies, setMovies] = useState<null | Movies>(null);
  const [fireStoreMovieList, setFireStoreMovieList] = useState<
    null | ListMovieType[]
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

  const selectedMovies = collection(DataBase, 'movie-list');
  const getMovieList = async () => {
    try {
      const response = await getDocs(selectedMovies);
      const data = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFireStoreMovieList(data);
    } catch (error) {
      console.log(error);
    }
  };
  const usersList = collection(DataBase, 'users');
  const getUsers = async () => {
    try {
      const response = await getDocs(usersList);
      const data = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(data);

      setFireStoreMovieList(data);
    } catch (error) {
      console.log(error);
    }
  };
  const movieListRef = collection(DataBase, 'users');
  const addMovieToMyList = async (newMovie: NewMovieToAddType) => {
    try {
      const response = await addDoc(
        collection(movieListRef, 'movieList'),
        newMovie
      );
      console.log(response);
    } catch (error) {}
  };

  const deleteItemFromMyList = async (movieID: string) => {
    const docToBeRemoved = doc(DataBase, 'movie-list', movieID);
    try {
      await deleteDoc(docToBeRemoved);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DataContext.Provider
      value={{
        getUsers,
        fetchMovies,
        movies,
        fireStoreMovieList,
        getMovieList,
        addMovieToMyList,
        deleteItemFromMyList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
