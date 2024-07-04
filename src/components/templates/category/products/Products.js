"use client";
import styles from "./products.module.css";
import { MdOutlineClose, MdOutlineGridView } from "react-icons/md";
import { BiSolidGrid } from "react-icons/bi";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import CategoryItem from "@/components/modules/category-item/CategoryItem";
import Pagination from "@/components/modules/pagination/Pagination";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { useState } from "react";
const Products = ({ products }) => {

  const [sortedProducts, setSortedProducts] = useState(products);

  const handleSort = (sortType) => {
    switch (sortType) {
      case "popularity":
        setSortedProducts([...products].sort((a, b) => b.score - a.score));
        break;
      case "rating":
        setSortedProducts([...products].sort((a, b) => b.score - a.score));
        break;
      case "latest":
        setSortedProducts([...products].sort((a, b) => b.date - a.date));
        break;
      case "price-low":
        setSortedProducts([...products].sort((b,a) => a.price - b.price));
        break;
      case "price-high":
        setSortedProducts([...products].sort((b, a) => b.price - a.price)); // Sort in descending order
        break;
      default:
        setSortedProducts(products); // Reset to original order
        break;
    }
  };

   const [currentPage, setCurrentPage] = useState(1);
 const pageSize = 10;

 const onPageChange = (page) => {
   setCurrentPage(page);
 };

 

  

  return (


    <section className="w-full flex-row-reverse  justify-between h-full ">

<article className="w-full h-full flex flex-row-reverse justify-center items-center ">

<div className="w-1/3 min-h-full flexgap-6 flex-col">
      <div className={styles.name_filtering}>
        <p className="text-yellow-800 text-lg">: انتخاب قهوه بر اساس</p>
        <section className="gap-4">
          <div className={styles.active}>
            <button onClick={() => handleSort("popularity")}>
              مرتب‌سازی بر اساس محبوبیت
            </button>
          </div>
          <div className={styles.active}>
            <button onClick={() => handleSort("rating")}>
              مرتب‌سازی بر اساس امتیاز
            </button>
          </div>
          <div className={styles.active}>
            <button onClick={() => handleSort("latest")}>
              مرتب‌سازی بر اساس آخرین
            </button>
          </div>
          <div className={styles.active}>
            <button onClick={() => handleSort("price-low")}>
              مرتب‌سازی بر اساس ارزانترین
            </button>
          </div>
          <div className={styles.active}>
            <button onClick={() => handleSort("price-high")}>
              مرتب‌سازی بر اساس گرانترین
            </button>
          </div>
        </section>
      </div>
    </div>

    <div className="h-full w-2/3 grid grid-cols-3" dir="rtl">
      <CategoryItem products={sortedProducts} />
    </div>

      
</article>

      <Pagination products={products.length} pageSize={pageSize} currentPage={currentPage} onPageChange={onPageChange} />

    </section>
  );
};

export default Products;
