import { ReactNode, createContext, useContext, useState } from 'react';
import { CommentaryType, Movies } from '../types/common_types';
import { auth, dataBase } from '../config/firebase';
import {
  DocumentReference,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import axios, { AxiosError } from 'axios';
import { AuthContext } from './AuthContext';
import { toastError } from '../assets/utils/failedToast';
import { successfulToast } from '../assets/utils/successfulToast';

type MovieToAddType = {
  title?: string;
  year?: number;
  userID?: string;
  thumbnail?: string;
  id?: string;
};
type DataContextType = {
  searchInputValue: string;
  setSearchInputValue: (newSearchInoutValue: string) => void;
  usersCollection: CollectionUser[] | null;
  getUsers: () => Promise<void>;
  movies: Movies | null;
  commentaries: CommentaryType[] | null;
  fetchMovies: () => Promise<void>;
  addMovieToMyList: (newMovie: MovieToAddType) => Promise<void>;
  removeMovieFromMyList: (movie: MovieToAddType) => Promise<void>;
  addCommentary: (movieID: string, textAreaValue: string) => Promise<void>;
  editComment: (
    commentID: string,
    updatedComment: CommentaryType
  ) => Promise<void>;
  removeComment: (commentID: string) => Promise<void>;
  getCommentaries: () => Promise<void>;
  fetchingMoviesStatus: boolean;
};
type CollectionUser = {
  email: string;
  id: string;
  movieList: MovieToAddType[];
};
type DataProviderProps = { children: ReactNode };

const initialDataContextState = {
  searchInputValue: '',
  setSearchInputValue: (newSearchInoutValue: string) => newSearchInoutValue,
  usersCollection: [] as CollectionUser[],
  getUsers: () => Promise.resolve(),
  movies: [] as Movies,
  commentaries: [] as CommentaryType[],
  fetchMovies: () => Promise.resolve(),
  addMovieToMyList: () => Promise.resolve(),
  removeMovieFromMyList: () => Promise.resolve(),
  addCommentary: () => Promise.resolve(),
  editComment: () => Promise.resolve(),
  removeComment: () => Promise.resolve(),
  getCommentaries: () => Promise.resolve(),
  fetchingMoviesStatus: false,
} as DataContextType;

export const DataContext = createContext(initialDataContextState);

export const DataProvider = ({ children }: DataProviderProps) => {
  const { setIsLoading } = useContext(AuthContext);
  const [movies, setMovies] = useState<null | Movies>(null);
  const [usersCollection, setUsersCollection] = useState<
    CollectionUser[] | null
  >(null);
  const [commentaries, setCommentaries] = useState<null | CommentaryType[]>(
    null
  );
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [fetchingMoviesStatus, setFetchingMoviesStatus] =
    useState<boolean>(false);

  const fetchMovies = async () => {
    setFetchingMoviesStatus(true);
    try {
      const response = await axios.get<Movies>(
        'https://5b81e3264853b358.mokky.dev/mixedmovies'
      );
      if (response) {
        setMovies(response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toastError(error.message);
      }
    } finally {
      setFetchingMoviesStatus(false);
    }
  };

  const getUsers = async () => {
    const usersList = collection(dataBase, 'users');
    try {
      const response = await getDocs(usersList);
      const data = response.docs.map((doc) => ({
        ...(doc.data() as CollectionUser),
        id: doc.id,
      }));
      if (data) {
        setUsersCollection(data);
      }
    } catch (error) {}
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
      getUsers();
      successfulToast(`'${newMovie.title}' - added to your list!`);
    } catch (error) {}
  };

  const removeMovieFromMyList = async (movie: MovieToAddType) => {
    setIsLoading(true);
    try {
      await updateDoc(movieListRef, {
        movieList: arrayRemove(movie),
      });
      getUsers();
      successfulToast(`'${movie.title}' - removed from your list!`);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const getCommentaries = async () => {
    const commentariesList = collection(dataBase, 'commentaries');
    try {
      const response = await getDocs(commentariesList);
      const data = response.docs.map((doc) => ({
        ...(doc.data() as CommentaryType),
        id: doc.id,
      }));
      if (data) {
        setCommentaries(data);
      }
    } catch (error) {}
  };

  const addCommentary = async (movieID: string, textAreaValue: string) => {
    const newCommentary = {
      movieID,
      userID: auth.currentUser?.uid,
      profileImg: '',
      email: auth.currentUser?.email,
      timestamp: new Date(),
      commentary: textAreaValue,
    };
    try {
      await addDoc(collection(dataBase, 'commentaries'), newCommentary);
      successfulToast(`Comment successfully added!`);
    } catch (error) {
      toastError('Comment adding failed. Try again later, please!');
    }
  };

  const editComment = async (
    commentID: string,
    updatedComment: CommentaryType
  ) => {
    const docToUpdate = doc(dataBase, 'commentaries', commentID);
    try {
      await updateDoc(docToUpdate, updatedComment);
      getCommentaries();
      successfulToast(`Comment successfully edited!`);
    } catch (error) {
      toastError('Comment editing failed. Try again later, please!');
    }
  };
  const removeComment = async (commentID: string) => {
    setIsLoading(true);
    const docToRemove = doc(dataBase, 'commentaries', commentID);
    try {
      await deleteDoc(docToRemove);
      getCommentaries();
      successfulToast(`Comment successfully deleted!`);
    } catch (error) {
      toastError('Comment deleting failed. Try again later, please!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        searchInputValue,
        setSearchInputValue,
        usersCollection,
        getUsers,
        fetchMovies,
        movies,
        addMovieToMyList,
        removeMovieFromMyList,
        addCommentary,
        editComment,
        removeComment,
        commentaries,
        getCommentaries,
        fetchingMoviesStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
