import { ChangeEvent, useState } from 'react';
import styles from './CommentaryForm.module.scss';
import { FiSend } from 'react-icons/fi';

export const CommentaryForm = () => {
  const [textAreaValue, setTextAreaValue] = useState<string>('');

  const catchTextAreaValueHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.currentTarget.value);
  };

  const sendCommentHandler = () => {
    console.log(textAreaValue);
    setTextAreaValue('');
  };
  return (
    <div className={styles.commentary_main_box}>
      <div className={styles.common_box}>
        {' '}
        <div className={styles.text_area_box}>
          <textarea
            value={textAreaValue}
            className={styles.text_area}
            onChange={catchTextAreaValueHandler}
            placeholder={'Share your thaughts...'}
          ></textarea>
        </div>
        {!!textAreaValue && (
          <div
            className={styles.submit_commentary_button_box}
            onClick={sendCommentHandler}
          >
            <div className={styles.submit_commentary_button}>
              {' '}
              <FiSend className={styles.send_icon} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
