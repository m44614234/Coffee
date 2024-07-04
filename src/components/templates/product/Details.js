"use client";
import { FaFacebookF, FaRegStar, FaStar, FaTwitter } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { TbSwitch3 } from "react-icons/tb";
import { FaTelegram, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import styles from "./details.module.css";
import Breadcrumb from "./Breadcrumb";
import AddToWishList from "./AddtoWishList";
import { showSwal } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Details = ({ productID, product, person }) => {
  const [count, setCount] = useState(1);
  const router = useRouter();
  const addToCart = async (event) => {
    event.preventDefault();

    if (!person) {
      return showSwal(
        "برای اضافه کردن به سبد خرید لطفا ابتدا لاگین شوید",
        "error",
        "فهمیدم"
      );
    }

    if (product.quantity === 0) {
      return showSwal("این تعداد در انبار موجود نیست", "error", "فهمیدم");
    }

    if (count === 0) {
      return showSwal("مقدار وارد شده صحیح نیست", "error", "فهمیدم");
    }

    const cart = {
      user: person,
      product: productID,
      complated: false,
      quantity: count,
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });

    if (res.status === 201) {
      product?.quantity - count;
      setCount(1);
      showSwal("محصول مورد نظر به سبد خرید اضافه شد", "success", "فهمیدم");
      router.refresh();
    }
  };

  return (
    <main className="flex-col w-full p-3 flex-wrap  md:w-2/3 ">
      <Breadcrumb title={product?.name} />
      <h2>{product?.name}</h2>

      <div className={styles.rating}>
      {product?.score === null ? <p>میزان امتیازی ثبت نشده است</p> : (
       <div className="flex flex-row gap-1">
            {new Array(product?.score || 1).fill(0).map((index, i) => (
              <FaStar key={index} />
            ))}
            {new Array(5 - product?.score || 1).fill(0).map((index, i) => (
              <FaRegStar key={index} />
            ))}
          </div>
          )}
         

        <p>
          (دیدگاه{" "}
          {product?.comments.filter((comment) => comment.isAccept).length})
        </p>
      </div>

      <p className={styles.price}>{product?.price.toLocaleString()} تومان</p>
      <span className={styles.description}>{product?.longDescription}</span>

      <hr />

      <div className={styles.Available}>
        <IoCheckmark />
        <div className=" flex flex-row" dir="rtl">
          <strong className="text-xl px-1 font-variant text-gray-800">
            {product?.quantity - count}
          </strong>
          <span className={styles?.description}>عدد موجود در انبار </span>
        </div>
      </div>

      <div className={styles.cart}>
        <button onClick={addToCart} className="text-white">
          افزودن به سبد خرید
        </button>
        <div className="">
          <span onClick={() => setCount(count - 1)}>-</span>
          <strong className="text-4xl text-gray-800">{count}</strong>
          <span onClick={() => setCount(count + 1)}>+</span>
        </div>
      </div>

      <section className={styles.wishlist}>
        <AddToWishList productID={product?._id} />
      </section>

      <hr />

      <div className={styles.details}>
        <strong>شناسه محصول : {product?._id}</strong>
        <p>
          {" "}
          <strong>دسته:</strong> Coffee Capsule, کپسول قهوه, همه موارد
        </p>
        <p>
          <strong>برچسب:</strong>
          {product?.tags.join(",")}
        </p>
      </div>

      <div className={styles.share}>
        <p>به اشتراک گذاری: </p>
        <a href="/">
          <FaTelegram />
        </a>
        <a href="/">
          <FaLinkedinIn />
        </a>
        <a href="/">
          <FaPinterest />
        </a>
        <a href="/">
          <FaTwitter />
        </a>
        <a href="/">
          <FaFacebookF />
        </a>
      </div>

      <hr />
    </main>
  );
};

export default Details;
