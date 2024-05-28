import { useState } from 'react';
import styles from './BurgerMenu.module.scss';
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';

export const BurgerMenu = () => {
  const [display, setDisplay] = useState<boolean>(false);

  const toggleDisplayHandler = () => {
    setDisplay(!display);
  };
  return (
    <div className={styles.burger_menu_main_box}>
      <div
        className={
          display
            ? styles.dropped_burger_menu_box
            : styles.hidden_burger_menu_box
        }
      ></div>
      <div className={styles.burger_button_box}>
        {display ? (
          <RxCross2
            onClick={toggleDisplayHandler}
            className={styles.burger_icon_button}
          />
        ) : (
          <RxHamburgerMenu
            onClick={toggleDisplayHandler}
            className={styles.burger_icon_button}
          />
        )}
      </div>
    </div>
  );
};
