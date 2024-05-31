import { CiUser } from 'react-icons/ci';
import styles from './Commentary.module.scss';

export const Commentary = () => {
  const commentary = {
    id: '147',
    userID: '123',
    profileImg: '',
    email: ' andrei@andrei.com',
    timestamp: 123456,
    commentary: 'Aha, here you are...',
  };
  return (
    <div className={styles.commentary_main_box}>
      <div className={styles.commentary_content_box}>
        <div className={styles.user_box}>
          <div className={styles.user_img_box}>
            <CiUser className={styles.user_icon} />
          </div>
          <h5 className={styles.user_name}>Andrei</h5>
        </div>
        <div className={styles.commentary_text_box}>
          <p className={styles.commentary_text}>
            One of the most thrilling movies I have ever seen...
          </p>
        </div>
        <div className={styles.commentary_timestamp_box}>
          <p className="">31.05.2024/18:36</p>
        </div>
      </div>
    </div>
  );
};
