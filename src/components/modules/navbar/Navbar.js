"use client";
import React, { useEffect, useState } from "react";
import styles from "./Nabvar.module.css";
import Link from "next/link";
import { IoIosArrowDown, IoMdExit } from "react-icons/io";
import {
  FaShoppingCart,
  FaRegHeart,
  FaMoneyCheckAlt,
  FaTiktok
} from "react-icons/fa";
import { FaHelmetUn, FaXmark } from "react-icons/fa6";
import { CiMenuBurger } from "react-icons/ci";

function Navbar({ isLogin , orderProductLength , wishList_Length}) {
  const [fixTop, setFixTop] = useState(false);

  useEffect(() => {
    const fixNavbarToTop = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 105) {
        setFixTop(true);
      } else {
        setFixTop(false);
      }
    };

    window.addEventListener("scroll", fixNavbarToTop);

    return () => window.removeEventListener("scroll", fixNavbarToTop);
  }, []);

  const [show, setShow] = useState(false);

  const ToggleEvent = () => {
    setShow(!show);
  };

  return (
    <nav
      className={
        fixTop
          ? styles.navbar_fixed
          : "flex absolute   flex-wrap z-40  w-full gap-4  md:p-4 "
      }
    >
      <div className="mx-auto w-full flex flex-wrap  px-2 sm:px-6 lg:px-8 bg-white shadow-md  fixed md:relative md:bg-white/95">
        <div className=" flex h-16 w-full items-center justify-between relative">
          <div
            className="absolute inset-y-0 start-0 flex items-center sm:hidden "
            dir="rtl"
          >
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center  rounded-md p-2 text-gray-800 transition-all"
              onClick={ToggleEvent}
            >
              {show === true
                ? <FaXmark width={8} height={8} />
                : <CiMenuBurger width={8} height={8} />}
            </button>
          </div>
          <div className="flex items-center flex-row justify-start w-full sm:items-stretch ">
            <div className="flex  items-center mx-2">
              <div className={styles.navbar_icons}>
                <Link href="/cart">
                  <FaShoppingCart />
                  <span>{orderProductLength}</span>
                </Link>
                <Link href="/wishlist">
                  <FaRegHeart />
                  <span>{wishList_Length}</span>
                </Link>
              </div>{" "}
            </div>
            <div className="hidden w-full gap-4  sm:ml-6 sm:block ">
              <ul className={styles.links}>
                <li>
                  <Link href="/">صفحه اصلی</Link>
                </li>
                <li>
                  <Link href="/category">فروشگاه</Link>
                </li>
                <li>
                  <Link href="/blog">مقالات</Link>
                </li>
                <li>
                  <Link href="/contact-us">تماس با ما</Link>
                </li>
                <li>
                  <Link href="/about-us">درباره ما</Link>
                </li>
                <li>
                  <Link href="/rules">قوانین</Link>
                </li>

                {!isLogin
                  ? <li>
                      <Link href="/login-register">ورود / عضویت</Link>
                    </li>
                  : <div className={styles.dropdown}>
                      <Link href="/p-user" className="mt-4">
                        <IoIosArrowDown className={styles.dropdown_icons} />
                        حساب کاربری
                      </Link>
                      <div className={styles.dropdown_content}>
                        <Link href="/p-user/orders">سفارشات</Link>
                        <Link href="/p-user/tickets">تیکت های پشتیبانی</Link>
                        <Link href="/p-user/comments">کامنت‌ها</Link>
                        <Link href="/p-user/wishlist">علاقه‌مندی‌ها</Link>
                        <Link href="/p-user/blogs">مقالات</Link>
                        
                        <Link href="/p-user/account-details">جزئیات اکانت</Link>
                      </div>
                    </div>}
              </ul>
            </div>
          </div>

          <div className="hidden  absolute inset-y-0 right-0 md:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
            <Link href="/">
              <img src="/images/logo.png" alt="Logo" />
            </Link>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div
        className=" flex flex-col min-w-full justify-center items-center mt-48  sm:hidden"
        id="mobile-menu"
      >
        {show
          ? <ul className="flex fixed flex-col py-3 shadow-md gap-3 min-w-full  justify-center bg-white/95 items-center">
              <li>
                <Link href="/">صفحه اصلی</Link>
              </li>
              <li>
                <Link href="/category">فروشگاه</Link>
              </li>
              <li>
                <Link href="/blog">مقالات</Link>
              </li>
              <li>
                <Link href="/contact-us">تماس با ما</Link>
              </li>
              <li>
                <Link href="/about-us">درباره ما</Link>
              </li>
              <li>
                <Link href="/rules">قوانین</Link>
              </li>

              {!isLogin
                ? <li>
                    <Link href="/login-register">ورود / عضویت</Link>
                  </li>
                : <div className={styles.dropdown}>
                    <Link href="/p-user" className="mt-4">
                      <IoIosArrowDown className={styles.dropdown_icons} />
                      حساب کاربری
                    </Link>
                    <div className={styles.dropdown_content}>
                      <Link href="/p-user/orders">سفارشات</Link>
                      <Link href="/p-user/tickets">تیکت های پشتیبانی</Link>
                      <Link href="/p-user/comments">کامنت‌ها</Link>
                      <Link href="/p-user/wishlist">علاقه‌مندی‌ها</Link>
                      <Link href="/p-user/account-details">جزئیات اکانت</Link>
                    </div>
                  </div>}
            </ul>
          : null}
      </div>
    </nav>
  );
}

export default Navbar;
