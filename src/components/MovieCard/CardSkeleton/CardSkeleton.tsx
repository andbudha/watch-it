import ContentLoader from 'react-content-loader';
import styles from './CardSkeleton.module.scss';

export const CardSkeleton = () => {
  return (
    <div className={styles.movie_card_main_box}>
      <ContentLoader
        speed={2}
        width={180}
        height={280}
        viewBox="0 0 180 280"
        backgroundColor="#eee3ee"
        foregroundColor="#e4d2e4"
      >
        <rect x="0" y="0" rx="8" ry="8" width="180" height="280" />
      </ContentLoader>
    </div>
  );
};
