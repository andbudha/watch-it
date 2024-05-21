import { ReactNode, createContext, useState } from 'react';
import { ListMovieType, Movies } from '../assets/types/common_types';
import { selectedMovieDataBase } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import axios from 'axios';

type DataContextType = {
  fireStoreMovieList: ListMovieType[] | null;
  getMovieList: () => Promise<void>;
  movies: Movies | null;
  fetchMovies: () => Promise<void>;
};

type DataProviderProps = { children: ReactNode };

const initialDataContextState = {
  fireStoreMovieList: [] as ListMovieType[],
  getMovieList: () => Promise.resolve(),
  movies: [] as Movies,
  fetchMovies: () => Promise.resolve(),
} as DataContextType;

export const DataContext = createContext(initialDataContextState);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [movies, setMovies] = useState<null | Movies>(null);
  const [fireStoreMovieList, setFireStoreMovieList] = useState<
    null | ListMovieType[]
  >(null);

  console.log(movies);

  const fetchMovies = async () => {
    const response = await axios.get<Movies>(
      'https://5b81e3264853b358.mokky.dev/mixedmovies'
    );
    if (response) {
      setMovies(response.data.slice(0, 10));
    }
  };

  const selectedMovies = collection(selectedMovieDataBase, 'movie-list');
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

  return (
    <DataContext.Provider
      value={{ fetchMovies, movies, fireStoreMovieList, getMovieList }}
    >
      {children}
    </DataContext.Provider>
  );
};
