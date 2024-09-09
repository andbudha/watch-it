import { MovieCard } from '../../../components/MovieCard/MovieCard';
import styles from './GridMovies.module.scss';
import { useContext } from 'react';
import { FaRegFaceSadTear } from 'react-icons/fa6';
import { PaginationContext } from '../../../context/PaginationContext';
import { CardSkeleton } from '../../../components/MovieCard/CardSkeleton/CardSkeleton';
import { DataContext } from '../../../context/DataContext';

export const GridMovies = () => {
  const { moviesToDisplayPerPage } = useContext(PaginationContext);
  const { fetchingMoviesStatus } = useContext(DataContext);

  const movieList = moviesToDisplayPerPage?.map((movie) => {
    return (
      <div key={movie.id}>
        <MovieCard movie={movie} movies={moviesToDisplayPerPage} />
      </div>
    );
  });

  const cardSkeletons = [...new Array(12)].map((_, i) => (
    <CardSkeleton key={i} />
  ));
  return (
    <div className={styles.movies_main_box}>
      {fetchingMoviesStatus ||
      (!fetchingMoviesStatus && !moviesToDisplayPerPage) ? (
        <div className={styles.movies_box}>{cardSkeletons}</div>
      ) : (
        <div className={styles.movies_box}>
          {!fetchingMoviesStatus && moviesToDisplayPerPage!.length > 0 ? (
            movieList
          ) : (
            <div className={styles.no_match_found_box}>
              {' '}
              <FaRegFaceSadTear className={styles.no_match_found_icon} />
              <div className={styles.no_match_found_text}>No Data Found</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
