import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import { Layout } from './components/Layout/Layout';
import { Home } from './components/pages/Home/Home';
import { Movie } from './components/pages/MoviePage/Movie';
function App() {
  return (
    <div className={styles.app_main_box}>
      <div className={styles.app_box}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="movies/movie" element={<Movie />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
