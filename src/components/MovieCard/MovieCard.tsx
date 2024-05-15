import { Movie } from '../../assets/types/common_types';
import styles from './MovieCard.module.scss';
type MovieCardProps = {
  movie: Movie;
};
export const MovieCard = ({ movie }: MovieCardProps) => {
  const getMovieDetailsHandler = (title: string) => {
    console.log(title);
  };
  return (
    <div className={styles.movie_card_main_box}>
      <img
        className={styles.movie_card_img}
        src={movie.thumbnail}
        alt="movie poster"
        onClick={() => getMovieDetailsHandler(movie.title)}
      />
    </div>
  );
};
