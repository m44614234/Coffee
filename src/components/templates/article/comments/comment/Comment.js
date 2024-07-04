import { FaRegStar, FaStar } from "react-icons/fa";

import styles from "./comment.module.css";
// const Comment = ({username , body , score}) => {
  const Comment = ({commentEmail ,comentDate ,commentBody ,commentImage }) => {



  return (
    <section className={styles.comment}>
      <img src={commentImage} className={styles.avatar} alt="" />
      <div>
        <div className={styles.main_details}>
          <div className={styles.user_info}>
            <strong>{commentEmail}</strong>
            <p>{new Date(comentDate).toLocaleDateString("fa-IR")}</p>
          </div>
          <div className={styles.stars}>
          <div className="flex flex-row gap-1">
             </div>
          </div>
        </div>
        <p>
          {commentBody}
        </p>
      </div>
    </section>
  );
};

export default Comment;
