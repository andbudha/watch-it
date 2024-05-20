import { useState, ChangeEvent } from 'react';
import { CiSearch } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import { Movie } from '../../../../assets/types/common_types';
import { MovieCard } from '../../../MovieCard/MovieCard';
import styles from './GridMovies.module.scss';

type GridMoviesProps = {
  movies?: Movie[] | null;
};
export const GridMovies = ({ movies }: GridMoviesProps) => {
  const [searchInputValue, setSearchInputValue] = useState<string>('');

  const getSearchInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.currentTarget.value);
  };
  const emptySearchInputHandler = () => {
    setSearchInputValue('');
  };
  const movieList = movies?.map((movie) => {
    return (
      <div key={movie.title}>
        <MovieCard movie={movie} movies={movies} />
      </div>
    );
  });
  return (
    <div className={styles.movies_main_box}>
      <div className={styles.search_main_box}>
        <div className={styles.search_box}>
          <div className={styles.search_icon_box}>
            {' '}
            <CiSearch className={styles.search_icon} />
          </div>{' '}
          <input
            value={searchInputValue}
            className={styles.search_input}
            onChange={getSearchInputValueHandler}
          />
          <div className={styles.remove_icon_box}>
            {' '}
            {searchInputValue && (
              <RxCross2
                className={styles.remove_icon}
                onClick={emptySearchInputHandler}
              />
            )}
          </div>
        </div>
      </div>
      <div className={styles.movies_box}>{movieList}</div>
    </div>
  );
};
