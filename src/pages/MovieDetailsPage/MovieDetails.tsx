import { NavLink, useParams } from 'react-router-dom';
import styles from './MovieDetails.module.scss';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';
import { IoChevronBack } from 'react-icons/io5';
import { BiCameraMovie } from 'react-icons/bi';
import { BandOfComments } from '../../components/BandOfComments/BandOfComments';
import { toastError } from '../../assets/utils/failedToast';

export const MovieDetails = () => {
  const { movieID } = useParams();
  const { user } = useContext(AuthContext);
  const { addMovieToMyList, movies, usersCollection, getCommentaries } =
    useContext(DataContext);

  const movie = movies?.find((movie) => movie.id === movieID);
  const castList = movie?.cast.join(', ');
  const genreList = movie?.genres.join(', ');

  const currentUserList = usersCollection?.find(
    (collectionUser) => collectionUser.id === user?.userID
  )?.movieList;
  const isInTheList = currentUserList?.find(
    (listMovie) => listMovie.id === movie?.id
  );

  const addMovieToMyListHandler = () => {
    const movieToAdd = {
      title: movie?.title,
      year: movie?.year,
      userID: user?.userID,
      thumbnail: movie?.thumbnail,
      id: movie?.id,
    };
    if (!user) {
      toastError('Log in first, please!');
    } else {
      addMovieToMyList({
        ...movieToAdd,
        thumbnail: movie?.thumbnail ? movie.thumbnail : '',
      });
    }
  };

  useEffect(() => {
    getCommentaries();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.movie_details_main_box}>
      <div className={styles.movie_details_box}>
        {' '}
        <div className={styles.img_and_button_box}>
          <div className={styles.movie_img_box}>
            {movie?.thumbnail ? (
              <img
                className={styles.movie_img}
                src={movie?.thumbnail}
                alt={`movie poster`}
              />
            ) : (
              <div className={styles.movie_card_img}>
                <div className={styles.camera_icon_box}>
                  {' '}
                  <BiCameraMovie className={styles.camera_icon} />
                </div>
              </div>
            )}
          </div>

          <button
            disabled={!!isInTheList}
            className={styles.add_movie_button}
            onClick={addMovieToMyListHandler}
          >
            {!!isInTheList ? 'already added' : 'add to my list'}
          </button>
          <NavLink className={styles.home_button} to={'/'}>
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
          <BandOfComments movieID={movieID} />
        </div>
      </div>
      <div className={styles.home_button_box}> </div>
    </div>
  );
};
