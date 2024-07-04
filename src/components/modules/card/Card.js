import Link from "next/link";
import styles from "./card.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";
const Card = ({name , price , img , shortDescription}) => {
  return (
    <div className={styles.card}>
      <div className={styles.details_container}>
        <img
          src="https://set-coffee.com/wp-content/uploads/2021/10/041-430x430.png"
          alt=""
        />
        <div className={styles.icons}>
          <Link href="/">
            <CiSearch />
            <p className={styles.tooltip}>مشاهده سریع</p>
          </Link>
          <div>
            <CiHeart />
            <p className={styles.tooltip}>افزودن به علاقه مندی ها </p>
          </div>
        </div>
        <button>افزودن به سبد خرید</button>
      </div>

      <div className={styles.details}>
        <Link href={"/"}>
          کپسول قهوه SETpresso سازگار با دستگاه نسپرسو ( RED ) 10 عددی LIMITED
          EDITION
        </Link>
        <div className="flex flex-row gap-2">
          {new Array(product.score)
            .fill(0)
            .map((index, i) => <FaStar key={index} />)}
          {new Array(5 - product.score)
            .fill(0)
            .map((index, i) => <FaRegStar key={index} />)}
        </div>
        <span>{price?.toLocaleString()} تومان</span>
      </div>
    </div>
  );
};

export default Card;
