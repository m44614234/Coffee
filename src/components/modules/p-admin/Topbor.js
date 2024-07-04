import styles from "./topbar.module.css";
import { IoIosSearch, IoIosNotifications } from "react-icons/io";
import Link from "next/link";
const Topbar = ({name , email , phone , role , image}) => {

return (
    <>
      <div className={styles.topbar}>
        <div className={styles.profile}>
          <div>
            <p>{name}</p>
            <span>{role === "ADMIN" ? "ادمین" : "کاربر"}</span>
          </div>
          <img src={image || "/images/user.png"} alt=""  />
        </div>
        <section>
          <Link href="/p-user" className="bg-red-800 rounded-md px-4 py-3">رفتن به پنل کاربری</Link>
          
        </section>
      </div>
    </>
  );
};

export default Topbar;
