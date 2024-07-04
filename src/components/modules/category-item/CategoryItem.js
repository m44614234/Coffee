"use client"
import Link from "next/link";
import styles from "./card.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";
import { showSwal } from "@/utils/helpers";
import React, { useEffect, useState } from "react";

const CategoryItem = ({ products  }) => {
  return (
    <>
      {products.map((product) => (
        <div className="py-1 px-1 m-2 shadow-xl" key={product._id}>
          <img
              src={
                product.img ||
                "https://set-coffee.com/wp-content/uploads/2021/10/041-430x430.png"
              }
              className="min-h-[300px]"
              alt=""
            />

          <div className="w-full flex flex-col gap-4 justify-start text-start">
            <Link href={`/product/${product._id}`}>{product.name}</Link>
            <div>{product.shortDescription}</div>
            <div className="flex flex-row gap-2">
              {new Array(product.score).fill(0).map((index, i) => (
                <FaStar key={index} className="text-yellow-500" />
              ))}
              {new Array(5 - product.score).fill(0).map((index, i) => (
                <FaRegStar key={index} />
              ))}
            </div>
            <section className="flex justify-between">
            <span>{product.price?.toLocaleString()} تومان</span>
              <Link href={`/product/${product._id}`} className="text-white bg-red-800 p-2 rounded-md">اطلاعات بیشتر</Link>
            </section>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoryItem;
