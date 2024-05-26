import { useContext } from 'react';
import { DataContext } from '../../../../context/DataContext';
import { MovieCard } from '../../../MovieCard/MovieCard';
import styles from './GridMovies.module.scss';

export const GridMovies = () => {
  const { movies } = useContext(DataContext);
  const movieList = movies?.map((movie) => {
    return (
      <div key={movie.id}>
        <MovieCard movie={movie} movies={movies} />
      </div>
    );
  });
  return (
    <div className={styles.movies_main_box}>
      <div className={styles.movies_box}>{movieList}</div>
    </div>
  );
};
