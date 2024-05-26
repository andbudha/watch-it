import { Movie } from '../../../../assets/types/common_types';
import { MovieCard } from '../../../MovieCard/MovieCard';
import styles from './GridMovies.module.scss';

type GridMoviesProps = {
  movies?: Movie[] | null;
};
export const GridMovies = ({ movies }: GridMoviesProps) => {
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
