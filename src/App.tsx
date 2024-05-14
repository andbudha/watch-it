import styles from './App.module.scss';
import { Footer } from './components/Footer/Footer';
import { Navbar } from './components/Navbar/Navbar';
function App() {
  return (
    <div className={styles.app_main_box}>
      <div className={styles.app_box}>
        <Navbar />
        <Footer />
      </div>
    </div>
  );
}

export default App;
