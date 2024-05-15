import axios from 'axios';
import styles from './Home.module.scss';
import { useEffect } from 'react';

export const Home = () => {
  const fetchMovies = async () => {
    const response = await axios.get(
      'https://5b81e3264853b358.mokky.dev/mixedmovies'
    );
    if (response) {
      console.log(response.data);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div className={styles.home_main_box}>
      <h2>Home Page</h2>
    </div>
  );
};
