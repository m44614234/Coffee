import { MdOutlineSms } from "react-icons/md";
import styles from "./article.module.css";
import { IoShareSocialOutline } from "react-icons/io5";
import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterest,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";

const Card = ({title , img , comments , date , _id , userName}) => {
  return (

   <div className={styles.card}>
      <Link className="w-full min-h-full overflow-hidden object-cover 
      hover:bg-black/50 " href={`/blogs/${_id}`}>
        <img
        src={img}
          alt=""
        />
      </Link>
      <div className={styles.date}>
        <span className="text-sm">{new Date(date).toLocaleDateString("fa-IR")}</span>
      </div>
      <div className={styles.details}>
        <Link href={`/blogs/${_id}`}   className={styles.title}>
          {title}      
            </Link>
        <div>
          <img
            src="https://secure.gravatar.com/avatar/665a1a4dc7cc052eaa938253ef413a78?s=32&d=mm&r=g"
            alt=""
          />
          <p>{userName}</p>
          <div>
            <MdOutlineSms />
            <span>{comments.length}</span>
          </div>
          <div className={styles.share}>
            <IoShareSocialOutline />
            <div className={styles.tooltip}>
              <Link href={"/"}>
                <FaTelegram />
              </Link>
              <Link href={"/"}>
                <FaLinkedinIn />
              </Link>
              <Link href={"/"}>
                <FaPinterest />
              </Link>
              <Link href={"/"}>
                <FaTwitter />
              </Link>
              <Link href={"/"}>
                <FaFacebookF />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>

   
  );
};

export default Card;
