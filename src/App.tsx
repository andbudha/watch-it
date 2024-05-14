import styles from './App.module.scss';
import { Footer } from './components/Footer/Footer';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/pages/Home/Home';
function App() {
  return (
    <div className={styles.app_main_box}>
      <div className={styles.app_box}>
        <Navbar />
        <Home />
        <Footer />
      </div>
    </div>
  );
}

export default App;
