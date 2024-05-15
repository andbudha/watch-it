import axios from 'axios';
import styles from './Home.module.scss';
import { useEffect, useState } from 'react';
import { Movies } from '../../../assets/types/common_types';
import { GridMovies } from './GridMovies/GridMovies';

export const Home = () => {
  const [movies, setMovies] = useState<null | Movies>(null);

  console.log(movies);

  const fetchMovies = async () => {
    const response = await axios.get<Movies>(
      'https://5b81e3264853b358.mokky.dev/mixedmovies'
    );
    if (response) {
      setMovies(response.data.slice(0, 8));
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div className={styles.home_main_box}>
      <GridMovies />{' '}
    </div>
  );
};
