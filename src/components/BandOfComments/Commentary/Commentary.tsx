import { CiUser } from 'react-icons/ci';
import styles from './Commentary.module.scss';
import { CommentaryType } from '../../../types/common_types';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { DataContext } from '../../../context/DataContext';
import { MiniLoader } from '../../Loaders/MiniLoader';

type CommentaryProps = {
  commentary: CommentaryType;
};
export const Commentary = ({ commentary }: CommentaryProps) => {
  const { user, isLoading } = useContext(AuthContext);
  const { removeComment } = useContext(DataContext);
  const [editCommentStatus, setEditCommentStatus] = useState<boolean>(false);

  const convertedTime = commentary.timestamp.toDate().toLocaleTimeString();
  const convertedDate = commentary.timestamp.toDate().toDateString();

  const showEditCommentInputHandler = () => {
    setEditCommentStatus(!editCommentStatus);
  };
  const deleteCommentHandler = (commentID: string) => {
    removeComment(commentID);
  };
  return (
    <div className={styles.commentary_main_box}>
      <div className={styles.commentary_content_box}>
        <div className={styles.user_box}>
          <div className={styles.user_img_box}>
            <CiUser className={styles.user_icon} />
          </div>
          <h5 className={styles.user_name}>{commentary.email}</h5>
        </div>
        {editCommentStatus ? (
          <textarea
            value={commentary.commentary}
            className={styles.edit_comment_input}
          ></textarea>
        ) : (
          <div className={styles.commentary_text_box}>
            <p className={styles.commentary_text}>{commentary.commentary}</p>
          </div>
        )}

        <div className={styles.commentary_footer_box}>
          <div className={styles.commentary_manage_box}>
            {user?.userID === commentary.userID && (
              <>
                <div
                  className={styles.edit_icon_box}
                  onClick={showEditCommentInputHandler}
                >
                  <BiEdit className={styles.edit_icon} />
                </div>
                <div
                  className={styles.delte_icon_box}
                  onClick={() => deleteCommentHandler(commentary.id)}
                >
                  {isLoading && <MiniLoader />}
                  <AiFillDelete className={styles.delete_icon} />
                </div>
              </>
            )}
          </div>
          <div className={styles.commentary_timestamp_box}>
            <p>{convertedTime}</p>
            <p>{convertedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
