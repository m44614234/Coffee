"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { FaRegStar, FaStar } from "react-icons/fa";
import axios from "axios";
import styles from "./table.module.css";


const TheRowBox = ({blog,index}) => {
   const router = useRouter();
 

   
   const showDetailsProduct = (blog) => {
      showSwal(
         blog.body,    
      );
   };

   const removeHandler = async (blogID) => {
      const res = await fetch(`/api/blog/${blogID}`, {
         method: "DELETE",
      });
      if (res.status === 200) {
         swal({
            title: "بلاگ مورد نظر با موفقیت حذف شد",
            icon: "success",
            buttons: "فهمیدم",
         }).then(() => {
            router.refresh();
         });
      }
   };

  




   return (
      <tr key={blog._id}>
         <td>{index + 1}</td>

         <td>
            <p className="text-lg text-slate-800">{blog.title}</p>
         </td>

         <td>
         <p className="text-lg text-slate-800">{blog.subTitle}</p>

         </td>

         

         <td>
            <button
               type="button"
               className={styles.edit_btn}
               onClick={() => showDetailsProduct(blog)}
            >
               مشاهده جزئیات
            </button>
         </td>

   

         <td>
            <button
               type="button"
               className={styles.delete_btn}
               onClick={() => removeHandler(blog._id)}
            >
               حذف
            </button>
         </td>
      </tr>
   );
}

export default TheRowBox;


export const showSwal = (
   title
) => {
   swal({
      title: `
     متن بلاگ: ${title} 
     `
   });
};