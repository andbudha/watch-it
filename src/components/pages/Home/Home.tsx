import styles from './Home.module.scss';
import { GridMovies } from './GridMovies/GridMovies';
import { Movie } from '../../../assets/types/common_types';
import { Pagination } from '../../Pagination/Pagination';
import { Search } from '../../Search/Search';
type HomeProps = {
  movies: Movie[] | null;
};
export const Home = ({ movies }: HomeProps) => {
  return (
    <div className={styles.home_main_box}>
      <Search />
      <GridMovies movies={movies} /> <Pagination />
    </div>
  );
};
