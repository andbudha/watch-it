import { ReactNode, createContext, useContext, useState } from 'react';
import { DataContext } from './DataContext';
import { Movie } from '../assets/types/common_types';

type PaginationContextType = {
  currentPage: number;
  numberOfPages: number;
  setCurrentPage: (pageNumber: number) => void;
  moviesToDisplayPerPage: Movie[] | undefined;
};
type PaginationProviderProps = { children: ReactNode };

const initialPaginationContextState = {
  currentPage: 0,
  numberOfPages: 0,
  setCurrentPage: (pageNumber: number) => pageNumber,
  moviesToDisplayPerPage: [] as Movie[],
} as PaginationContextType;

export const PaginationContext = createContext(initialPaginationContextState);

export const PaginationProvider = ({ children }: PaginationProviderProps) => {
  const { movies } = useContext(DataContext);
  const moviesPerPage = 10;
  const numberOfPages = Math.ceil(movies ? movies?.length / moviesPerPage : 0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const start = moviesPerPage * (currentPage - 1);
  const end = start + moviesPerPage;
  const moviesToDisplayPerPage = movies?.slice(start, end);
  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        numberOfPages,
        setCurrentPage,
        moviesToDisplayPerPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
