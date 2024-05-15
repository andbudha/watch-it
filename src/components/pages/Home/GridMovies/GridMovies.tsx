import { MovieCard } from '../../../MovieCard/MovieCard';
import styles from './GridMovies.module.scss';

export const GridMovies = () => {
  return (
    <div className={styles.movies_main_box}>
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
    </div>
  );
};
