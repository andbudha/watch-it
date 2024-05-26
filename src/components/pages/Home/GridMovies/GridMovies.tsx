import { MovieCard } from '../../../MovieCard/MovieCard';
import styles from './GridMovies.module.scss';
import { useContext } from 'react';
import { PaginationContext } from '../../../../context/PaginationContext';

export const GridMovies = () => {
  const { moviesToDisplayPerPage } = useContext(PaginationContext);

  const movieList = moviesToDisplayPerPage?.map((movie) => {
    return (
      <div key={movie.id}>
        <MovieCard movie={movie} movies={moviesToDisplayPerPage} />
      </div>
    );
  });
  return (
    <div className={styles.movies_main_box}>
      <div className={styles.movies_box}>{movieList}</div>
    </div>
  );
};
