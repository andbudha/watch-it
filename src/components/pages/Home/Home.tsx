import styles from './Home.module.scss';
import { GridMovies } from './GridMovies/GridMovies';
import { Movie } from '../../../assets/types/common_types';
type HomeProps = {
  movies: Movie[] | null;
};
export const Home = ({ movies }: HomeProps) => {
  return (
    <div className={styles.home_main_box}>
      <GridMovies movies={movies} />{' '}
    </div>
  );
};
