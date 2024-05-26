import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import { Layout } from './components/Layout/Layout';
import { Home } from './components/pages/Home/Home';
import { MovieDetails } from './components/pages/MovieDetailsPage/MovieDetails';
import { GridMovies } from './components/pages/Home/GridMovies/GridMovies';
import { useContext, useEffect } from 'react';
import { Login } from './components/pages/Login/Login';
import { Signup } from './components/pages/Signup/Signup';
import { PageNotFound } from './components/pages/PageNotFound/PageNotFound';
import { Toaster } from 'react-hot-toast';
import { MyList } from './components/pages/MyList/MyList';
import { DataContext } from './context/DataContext';
import { AuthContext } from './context/AuthContext';

function App() {
  const { getUsers, fetchMovies } = useContext(DataContext);
  const { stayLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    stayLoggedIn();
    getUsers();
    fetchMovies();
  }, []);
  return (
    <div className={styles.app_main_box}>
      <Toaster />
      <div className={styles.app_box}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route index path="movies" element={<GridMovies />} />
            <Route index path="mylist" element={<MyList />} />
            <Route path="movies/movie/:movieID" element={<MovieDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
