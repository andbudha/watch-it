import { useContext, useEffect } from 'react';
import styles from './Paginator.module.scss';
import { PaginationContext } from '../../context/PaginationContext';
import { Pagination } from '@mui/material';

export const Paginator = () => {
  const { numberOfPages, currentPage, setCurrentPage } =
    useContext(PaginationContext);

  useEffect(() => {}, [currentPage]);
  return (
    <div className={styles.pagination_main_box}>
      <div className={styles.pagination_box}>
        <Pagination
          size={'large'}
          count={numberOfPages}
          page={currentPage}
          color="secondary"
          onChange={(_: any, pageNumber: number) => setCurrentPage(pageNumber)}
        />
      </div>
    </div>
  );
};
