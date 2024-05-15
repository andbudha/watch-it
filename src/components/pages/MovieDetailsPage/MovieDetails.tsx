import { useParams } from 'react-router-dom';
import styles from './MovieDetails.module.scss';
import { Movie } from '../../../assets/types/common_types';

type MovieProps = {
  movies: Movie;
};
export const MovieDetails = ({ movies }: MovieProps) => {
  console.log(useParams());
  console.log(movies);

  return (
    <div className={styles.movie_main_box}>
      <h2>Movie Page</h2>
    </div>
  );
};
