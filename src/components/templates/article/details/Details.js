
import Link from "next/link";
import { FaAngleLeft, FaAngleRight, FaFacebookF, FaLinkedinIn, FaPinterest, FaTelegram, FaTwitter } from 'react-icons/fa'
import { IoGridOutline } from "react-icons/io5";
import styles from './details.module.css'

const Details = ({title, subTitle, img, comments, body, date, userName , tags}) => {
  return (
    <section className="mt-0 md:mt-24">
           <p className={styles.tag}>{tags === null ? "" : tags}</p>
                <p className={styles.title}>{title}</p>
                <div className={styles.author}>
                    <img       src="https://secure.gravatar.com/avatar/665a1a4dc7cc052eaa938253ef413a78?s=32&d=mm&r=g" alt="" />
                    <p>{userName || "کاربر"}</p>
                </div>

                <div className={styles.main_img}>
                    <div class={styles.date}>
                        <span>{new Date(date).toLocaleDateString("fa-IR")}</span>
                    </div>
                    <img src={img} alt="" />
                </div>
                <section className="w-full flex flex-col gap-y-3 px-0 md:px-6 " dir="rtl">
                <strong className="w-full mt-3  text-lg  " dir="rtl">{subTitle}</strong>
                    <p className="mb-12">{body}</p>
                </section>
                

                <div className={styles.contents}>
                    <div className={styles.icons}>
                        <Link href={'/'}><FaTelegram /></Link>
                        <Link href={'/'}><FaLinkedinIn /></Link>
                        <Link href={'/'}><FaPinterest /></Link>
                        <Link href={'/'}><FaTwitter /></Link>
                        <Link href={'/'}><FaFacebookF /></Link>
                    </div>
                   
                </div>
    </section>
  )
}

export default Details
