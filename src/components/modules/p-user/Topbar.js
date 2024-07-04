import styles from "./topbar.module.css";
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
          {role==='ADMIN' ?
          <Link href="/p-admin" className="bg-red-800 rounded-md px-4 py-3">رفتن به پنل ادمین</Link>
          : <Link href="/" className="bg-red-800 rounded-md px-4 py-3">صفحه اصلی</Link>
        }
        </section>
      </div>
    </>
  );
};

export default Topbar;
