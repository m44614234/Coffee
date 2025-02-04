import Link from 'next/link'
import styles from './card.module.css'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { CiSearch } from 'react-icons/ci'

const Card = () => {
    return (
        <div className={styles.card}>
            <div className={styles.delete}>
                <MdDelete />
                <p>حذف</p>
            </div>
            <div className={styles.details_container}>
                <img src="https://set-coffee.com/wp-content/uploads/2021/10/041-430x430.png" alt="" />
                <div className={styles.icons}>
                    <Link href="/">
                        <CiSearch />
                        <p className={styles.tooltip}>مشاهده سریع</p>
                    </Link>
                </div>
                <button>افزودن به سبد خرید</button>
            </div>


            <div className={styles.details}>
                <Link href={'/'}>کپسول قهوه SETpresso سازگار با دستگاه نسپرسو ( RED ) 10 عددی LIMITED EDITION</Link>
                <div>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaRegStar />
                    <FaRegStar />
                </div>
                <span>825,000 تومان</span>
            </div>
        </div>
    )
}

export default Card
