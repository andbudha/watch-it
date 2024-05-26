import styles from './Home.module.scss';
import { GridMovies } from './GridMovies/GridMovies';
import { Pagination } from '../../Pagination/Pagination';
import { Search } from '../../Search/Search';

export const Home = () => {
  return (
    <div className={styles.home_main_box}>
      <Search />
      <GridMovies />
      <Pagination />
    </div>
  );
};
