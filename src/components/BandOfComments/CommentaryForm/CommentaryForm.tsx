import { ChangeEvent, useContext, useState } from 'react';
import styles from './CommentaryForm.module.scss';
import { FiSend } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../../context/DataContext';
import { toastError } from '../../../assets/utils/failedToast';
import { AuthContext } from '../../../context/AuthContext';

export const CommentaryForm = () => {
  const { user } = useContext(AuthContext);
  const { addCommentary, getCommentaries } = useContext(DataContext);
  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const { movieID } = useParams();

  const catchTextAreaValueHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!user && e.currentTarget.value.length === 1) {
      toastError('Log in first, please!');
    } else {
      setTextAreaValue(e.currentTarget.value);
    }
  };

  const addCommentHandler = () => {
    if (!user) {
      toastError('Log in first, please!');
    } else if (user && textAreaValue.trim() === '') {
      toastError('Write a comment first, please!');
    } else if (user && movieID && textAreaValue.trim() !== '') {
      addCommentary(movieID, textAreaValue.trim());
      getCommentaries();
    }
    setTextAreaValue('');
  };
  return (
    <div className={styles.commentary_main_box}>
      <div className={styles.common_box}>
        <div className={styles.text_area_box}>
          <textarea
            value={textAreaValue}
            className={styles.text_area}
            onChange={catchTextAreaValueHandler}
            placeholder={'Leave a comment...'}
          ></textarea>
        </div>
        <div
          className={styles.submit_commentary_button_box}
          onClick={addCommentHandler}
        >
          <div className={styles.submit_commentary_button}>
            {' '}
            <FiSend className={styles.send_icon} />
          </div>
        </div>
      </div>
    </div>
  );
};
