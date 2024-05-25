import { ReactNode, createContext, useState } from 'react';
import { ListMovieType, Movies } from '../assets/types/common_types';
import { auth, dataBase } from '../config/firebase';
import {
  DocumentReference,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import axios from 'axios';

type NewMovieToAddType = {
  title?: string;
  year?: number;
  userID?: string;
};
type DataContextType = {
  usersCollection: UsersCollectionType[] | null;
  fireStoreMovieList: ListMovieType[] | null;
  getUsers: () => Promise<void>;
  movies: Movies | null;
  fetchMovies: () => Promise<void>;
  addMovieToMyList: (newMovie: NewMovieToAddType) => Promise<void>;
  deleteItemFromMyList: (movieID: string) => Promise<void>;
};

type CollectionUser = {
  email: string;
  id: string;
  movieList: NewMovieToAddType[];
};
type UsersCollectionType = {
  users: CollectionUser;
};
type DataProviderProps = { children: ReactNode };

const initialDataContextState = {
  usersCollection: [] as UsersCollectionType[],
  fireStoreMovieList: [] as ListMovieType[],
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
  const [usersCollection, setUsersCollection] =
    useState<UsersCollectionType | null>(null);

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
      console.log(data);
      setUsersCollection(data);
      setFireStoreMovieList(data);
    } catch (error) {
      console.log(error);
    }
  };

  let movieListRef: DocumentReference<unknown, {}>;
  if (auth.currentUser) {
    movieListRef = doc(dataBase, 'users', auth.currentUser.uid);
  }

  const addMovieToMyList = async (newMovie: NewMovieToAddType) => {
    try {
      const response = await updateDoc(movieListRef, {
        movieList: arrayUnion(newMovie),
      });
      console.log(response);
    } catch (error) {}
  };

  const deleteItemFromMyList = async (movieID: string) => {
    const docToBeRemoved = doc(dataBase, 'movie-list', movieID);
    try {
      await deleteDoc(docToBeRemoved);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DataContext.Provider
      value={{
        usersCollection,
        getUsers,
        fetchMovies,
        movies,
        fireStoreMovieList,
        addMovieToMyList,
        deleteItemFromMyList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
