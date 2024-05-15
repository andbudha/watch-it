import { NavLink } from 'react-router-dom';
import { Movie } from '../../assets/types/common_types';
import styles from './MovieCard.module.scss';
type MovieCardProps = {
  movie: Movie;
  movies: Movie[];
};
export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className={styles.movie_card_main_box}>
      <NavLink to={`/movies/movie/${movie.title}`}>
        <img
          className={styles.movie_card_img}
          src={movie.thumbnail}
          alt="movie poster"
        />
      </NavLink>
    </div>
  );
};
