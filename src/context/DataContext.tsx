import { ReactNode, createContext, useState } from 'react';
import { ListMovieType } from '../assets/types/common_types';
import { selectedMovieDataBase } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

type DataContextType = {
  fireStoreMovieList: ListMovieType[] | null;
  getMovieList: () => Promise<void>;
};

type DataProviderProps = { children: ReactNode };

const initialDataContextState = {
  fireStoreMovieList: [] as ListMovieType[],
  getMovieList: () => Promise.resolve(),
} as DataContextType;

export const DataContext = createContext(initialDataContextState);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [fireStoreMovieList, setFireStoreMovieList] = useState<
    null | ListMovieType[]
  >(null);

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
    <DataContext.Provider value={{ fireStoreMovieList, getMovieList }}>
      {children}
    </DataContext.Provider>
  );
};
