import { NavLink, useParams } from 'react-router-dom';
import styles from './MovieDetails.module.scss';
import { Movie } from '../../../assets/types/common_types';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { DataContext } from '../../../context/DataContext';
import { IoChevronBack } from 'react-icons/io5';

type MovieProps = {
  movies: Movie[] | null;
};
export const MovieDetails = ({ movies }: MovieProps) => {
  const { movieID } = useParams();
  const { user } = useContext(AuthContext);
  const { addMovieToMyList, getUsers } = useContext(DataContext);
  const movie = movies?.find((movie) => movie.title === movieID);
  const castList = movie?.cast.splice(0, 5).join(', ');
  const genreList = movie?.genres.join(', ');

  const addMovieToMyListHandler = () => {
    const movieToAdd = {
      title: movie?.title,
      year: movie?.year,
      userID: user?.userID,
      thumbnail: movie?.thumbnail,
      id: movie?.title,
    };
    addMovieToMyList(movieToAdd);
    getUsers();
  };

  return (
    <div className={styles.movie_details_main_box}>
      <div className={styles.movie_details_box}>
        {' '}
        <div className={styles.img_and_button_box}>
          <div className={styles.movie_img_box}>
            <img
              className={styles.movie_img}
              src={movie?.thumbnail}
              alt={`movie poster`}
            />
          </div>
          <div
            className={styles.add_movie_button}
            onClick={addMovieToMyListHandler}
          >
            add to my list
          </div>
          <NavLink className={styles.home_button} to={'/'}>
            {' '}
            <IoChevronBack className={styles.chevron_icon} />
            main
          </NavLink>
        </div>
        <div className={styles.movie_info_box}>
          <div className={styles.title_box}>
            <h3 className={styles.movie_details_header}>
              Title:{' '}
              <span className={styles.movie_details}>
                {movie?.title ? movie.title : 'Missing...'}
              </span>
            </h3>
          </div>
          <div className={styles.genre_box}>
            <h3 className={styles.movie_details_header}>
              Genre:{' '}
              <span className={styles.movie_details}>
                {genreList?.length ? genreList : 'Missing...'}
              </span>
            </h3>
          </div>
          <div className={styles.release_year_box}>
            <h3 className={styles.movie_details_header}>
              Release Year:{' '}
              <span className={styles.movie_details}>
                {movie?.year ? movie.year : 'Missing...'}
              </span>
            </h3>
          </div>
          <div className={styles.cast_box}>
            <h3 className={styles.movie_details_header}>
              Cast:{' '}
              <span className={styles.movie_details}>
                {castList?.length ? castList : 'Missing...'}
              </span>
            </h3>
          </div>
          <div className={styles.story_box}>
            <h3 className={styles.movie_details_header}>
              Story:{' '}
              <span className={styles.movie_details}>
                {movie?.extract ? movie.extract : 'Missing...'}
              </span>
            </h3>
          </div>
        </div>
      </div>
      <div className={styles.home_button_box}> </div>
    </div>
  );
};
