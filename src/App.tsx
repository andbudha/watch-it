import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import { Layout } from './components/Layout/Layout';
import { Home } from './components/pages/Home/Home';
import { MovieDetails } from './components/pages/MovieDetailsPage/MovieDetails';
import { GridMovies } from './components/pages/Home/GridMovies/GridMovies';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Movies } from './assets/types/common_types';
function App() {
  const [movies, setMovies] = useState<null | Movies>(null);

  console.log(movies);

  const fetchMovies = async () => {
    const response = await axios.get<Movies>(
      'https://5b81e3264853b358.mokky.dev/mixedmovies'
    );
    if (response) {
      setMovies(response.data.slice(0, 10));
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div className={styles.app_main_box}>
      <div className={styles.app_box}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home movies={movies} />} />
            <Route index path="movies" element={<GridMovies />} />
            <Route
              path="movies/movie/:movieID"
              element={<MovieDetails movies={movies} />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
