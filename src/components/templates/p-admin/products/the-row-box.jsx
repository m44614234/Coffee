"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { FaRegStar, FaStar } from "react-icons/fa";
import axios from "axios";
import styles from "./table.module.css";


const TheRowBox = ({product,index}) => {
   const router = useRouter();
   const nameRef = useRef("");
   const priceRef = useRef("");

   
   const showDetailsProduct = (product) => {
      showSwal(
         product.name,
         product.price,
         product.shortDescription,
         product.longDescription,
         product.score
      );
   };

   const removeHandler = async (productID) => {
      const res = await fetch(`/api/products/${productID}`, {
         method: "DELETE",
      });
      if (res.status === 200) {
         swal({
            title: "محصول مورد نظر با موفقیت حذف شد",
            icon: "success",
            buttons: "فهمیدم",
         }).then(() => {
            router.refresh();
         });
      }
   };

   const updateHandler = async (productID,theName,thePrice) => {
      const formData = {
         name: theName,
         price: thePrice,
      }

      axios.put(`/api/products/${productID}`, formData)
         .then(d => {
            swal({
               title: "محصول مورد نظر با موفقیت به روزرسانی شد",
               icon: "success",
               buttons: "فهمیدم",
            })
            router.refresh();
         })
         .catch(error => {
            const message = error.response.data ? error.response.data.data : "خطا در فرایند به روزرسانی";
            swal({
               title: message,
               icon: "error",
            })
         }
         )
   };




   return (
      <tr key={product._id}>
         <td>{index + 1}</td>

         <td>
            <input
               defaultValue={product.name}
               ref={nameRef}
               className="p-1 border-2 border-red-800 rounded-md"
            />
         </td>

         <td>
            <input
               defaultValue={product.price}
               ref={priceRef}
               className="p-1 border-2 border-red-800 rounded-md"
            />
         </td>

         <td className="flex flex-row justify-center items-center">
            <div className="flex flex-row gap-1">
               {new Array(product.score).fill(0).map((index, i) => (
                  <FaStar className="text-yellow-500" />
               ))}
               {new Array(5 - product.score).fill(0).map((index, i) => (
                  <FaRegStar />
               ))}
            </div>
         </td>

         <td>
            <button
               type="button"
               className={styles.edit_btn}
               onClick={() => showDetailsProduct(product)}
            >
               مشاهده جزئیات
            </button>
         </td>

         <td>
            <button
               className={styles.edit_btn}
               type="button"
               onClick={() => updateHandler(product._id, nameRef.current.value, priceRef.current.value,)}
            >
               ویرایش
            </button>
         </td>

         <td>
            <button
               type="button"
               className={styles.delete_btn}
               onClick={() => removeHandler(product._id)}
            >
               حذف
            </button>
         </td>
      </tr>
   );
}

export default TheRowBox;


export const showSwal = (
   name,
   price,
   shortDescription,
   longDescription,
   score
) => {
   swal({
      title: `
     نام محصول: ${name} 
     قیمت: ${price}
     توضیحات کوتاه: ${shortDescription}
    توضیحات تفصیلی: ${longDescription}
    امتیاز:  ${score}    `,
   });
};