"use client";

import styles from "./sidebar.module.css";
import { ImReply } from "react-icons/im";
import { FaBlog, FaComments, FaHeart, FaShoppingBag, FaUsers , FaHome } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdSms, MdLogout } from "react-icons/md";
import { usePathname } from "next/navigation";
import { TbListDetails } from "react-icons/tb";
import Link from "next/link";
import swal from "sweetalert";

const Sidebar = ({name , email , phone , role}) => {
  const path = usePathname();

  const logoutHandler = () => {
    swal({
      title: "آیا از خروج اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "بله"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/auth/signout", {
          method: "POST",
        });

        if (res.status === 200) {
          swal({
            title: "با موفقیت از اکانت خارج شدین",
            icon: "success",
            buttons: "فهمیدم",
          }).then((result) => {
            location.replace("/");
          });
        }
      }
    });
  };
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar_header}>
      <div className="flex flex-row gap-3">  <Link href="/"><span className="text-3xl text-gray-200"><FaHome/></span></Link> <span>خوش اومدی <span className="text-gray-200">{name}</span> عزیز</span> </div>
      </div>
      <ul className={styles.sidebar_main}>
        {path.includes("/p-user") ? (
          <>
            <Link href={"/p-user"} className={styles.sidebar_link_active}>
              <ImReply />
              پیشخوان
            </Link>
            <Link href={"/p-user/orders"}>
              <FaShoppingBag />
              سفارش ها
            </Link>
            <Link href={"/p-user/blogs"}>
              <FaBlog />
              مقالات
            </Link>
            <Link href={"/p-user/tickets"}>
              <MdSms />
              تیکت های پشتیبانی
            </Link>
            <Link href={"/p-user/comments"}>
              <FaComments />
              کامنت ها
            </Link>
            <Link href={"/p-user/wishlist"}>
              <FaHeart />
              علاقه مندی
            </Link>
            
            <Link href={"/p-user/account-details"}>
              <TbListDetails />
              جزئیات اکانت
            </Link>
          </>
        ) : (
          <>
            <Link href={"/p-admin"} className={styles.sidebar_link_active}>
              <ImReply />
              پیشخوان
            </Link>

            <Link href={"/p-admin/products"}>
              <FaShoppingBag />
              محصولات
            </Link>
            <Link href={"/p-admin/users"}>
              <FaUsers />
              کاربران
            </Link>
            <Link href={"/p-admin/comments"}>
              <FaComments />
              کامنت ها
            </Link>

            <Link href={"/p-admin/tickets"}>
              <MdSms />
              تیکت ها
            </Link>
            <Link href={"/p-admin/discount"}>
              <MdOutlineAttachMoney />
              تخفیفات
            </Link>
          </>
        )}
      </ul>
      <div className={styles.logout} onClick={logoutHandler}>
        <MdLogout />
        خروج
      </div>
    </aside>
  );
};

export default Sidebar;
