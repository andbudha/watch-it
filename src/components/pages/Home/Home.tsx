import styles from './Home.module.scss';
import { GridMovies } from './GridMovies/GridMovies';
import { Search } from '../../Search/Search';
import { Paginator } from '../../Paginator/Paginator';

export const Home = () => {
  return (
    <div className={styles.home_main_box}>
      <Search />
      <GridMovies />
      <Paginator />
    </div>
  );
};
