import { NavLink, Navigate } from 'react-router-dom';
import styles from './MyList.module.scss';
import { AiFillDelete } from 'react-icons/ai';

import { IoChevronBack } from 'react-icons/io5';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { DataContext } from '../../../context/DataContext';
export const MyList = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { deleteItemFromMyList, usersCollection, getUsers } =
    useContext(DataContext);
  console.log(isLoggedIn);

  const removeMovieHandler = (movieID: string | undefined) => {
    deleteItemFromMyList(movieID);
    getUsers();
  };

  const currentUserList = usersCollection?.find(
    (collectionUser) => collectionUser.id === user?.userID
  )?.movieList;

  console.log(currentUserList);

  if (!user) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className={styles.mylist_main_box}>
      <div className={styles.mylist_box}>
        {!!currentUserList?.length && <h2>Movies to watch:</h2>}
        {currentUserList?.length ? (
          currentUserList.map((movie) => {
            return (
              <div className={styles.list_item_box} key={movie.id}>
                <div className={styles.list_item_img_box}>
                  <img
                    className={styles.list_item_img}
                    src={movie.thumbnail}
                    alt="movie poster"
                  />
                </div>
                <div className={styles.list_item_detail_box}>
                  <h4 className={styles.list_item_title}>
                    Title: <span className={styles.title}>{movie.title}</span>
                  </h4>
                  <h4 className={styles.list_item_year}>
                    Year: <span className={styles.year}>{movie.year}</span>
                  </h4>
                </div>
                <div className={styles.list_item_icon_box}>
                  <AiFillDelete
                    className={styles.list_item_icon}
                    onClick={() => removeMovieHandler(movie.userID)}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.mylist_info_box}>
            {' '}
            <h1>This List Is Currently Empty</h1>
            <h2>Add movies to your list</h2>
            <NavLink className={styles.grid_movies_button} to={'/'}>
              {' '}
              <IoChevronBack className={styles.chevron_icon} />
              main
            </NavLink>
          </div>
        )}
        {!!currentUserList?.length && (
          <div className={styles.total_amount_box}>
            <h4>Total:</h4>
            <span className={styles.total_amount}>
              {currentUserList?.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
