import { FaRegStar, FaStar } from "react-icons/fa";

import styles from "./comment.module.css";
const Comment = ({username , body , score}) => {

console.log("username  =>" , username)
console.log("  body =>" , body)

  return (
    <section className={styles.comment}>
      <img src="/images/shahin.jpg" className={styles.avatar} alt="" />
      <div>
        <div className={styles.main_details}>
          <div className={styles.user_info}>
            <strong>{username}</strong>
            <p>{new Date().toLocaleDateString("fa-IR")}</p>
          </div>
          <div className={styles.stars}>
          <div className="flex flex-row gap-1">
       
       {new Array(score).fill(0).map((index, i) => <FaStar  key={index}/>)}
       {new Array(5-score).fill(0).map((index, i) => <FaRegStar  key={index}/>)}
 
         </div>
          </div>
        </div>
        <p>
          {body}
        </p>
      </div>
    </section>
  );
};

export default Comment;
