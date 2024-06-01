import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './BandOfComments.module.scss';
import { Commentary } from './Commentary/Commentary';
import { CommentaryForm } from './CommentaryForm/CommentaryForm';

export const BandOfComments = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.comment_band_main_box}>
      <h2 className={styles.section_title}>Share your thaughts here:</h2>
      <div className={styles.underline}></div>
      <Commentary />
      <Commentary />
      <Commentary />
      {!!user && <CommentaryForm />}
    </div>
  );
};
