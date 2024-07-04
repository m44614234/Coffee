"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { FaRegStar, FaStar } from "react-icons/fa";
import axios from "axios";
import styles from "./table.module.css";


const TheRowBox = ({user,index}) => {
   const router = useRouter();
   const nameRef = useRef("");
   const emailRef = useRef("");

   
   const changeRole = async (userID) => {
      const res = await fetch("/api/user/role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userID }),
      });
      if (res.status === 200) {
        swal({
          title: "نقش کاربر با موفقیت تغییر یافت",
          icon: "success",
          buttons: "فهمیدم",
        }).then(() => {
          router.refresh();
        });
      }
    };
  
    const removeHandler = async (userID) => {
      // Confirm ✅
      // Validation (You) ✅
  
      swal({
        title: "آیا از حذف کاربر اطمینان دارین؟",
        icon: "warning",
        buttons: ["نه", "آره"],
      }).then(async (result) => {
        if (result) {
          const res = await fetch(`/api/user/${userID}`, {
            method: "DELETE",
          });
  
          if (res.status === 200) {
            swal({
              title: "کاربر مورد نظر با موفقیت حذف شد",
              icon: "success",
              buttons: "فهمیدم",
            }).then(() => {
              router.refresh();
            });
          }
        }
      });
    };
  
    const banUser = async (email, phone) => {
      // Confirm ✅
      // Validation (You) ✅
  
      swal({
        title: "آیا از بن کاربر اطمینان دارین؟",
        icon: "warning",
        buttons: ["نه", "آره"],
      }).then(async (result) => {
        if (result) {
          const res = await fetch("/api/user/ban", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, phone }),
          });
  
          if (res.status === 200) {
            swal({
              title: "کاربر مورد نظر با موفقیت بن شد",
              icon: "success",
              buttons: "فهمیدم",
            }).then(() => {
              router.refresh();
            });
          }
        }
      });
    };


   const updateHandler = async (userID,theName,theEmail) => {
      const formData = {
         name: theName,
         email : theEmail,
      }

      axios.put(`/api/user/${userID}`, formData)
         .then(d => {
            swal({
               title: "کاربر مورد نظر با موفقیت به روزرسانی شد",
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
      <tr key={user._id}>
         <td>{index + 1}</td>

         <td>
            <input
               defaultValue={user.name}
               ref={nameRef}
               className="p-1 border-2 border-red-800 rounded-md"
            />
         </td>

         <td>
            <input
               defaultValue={user.email}
               ref={emailRef}
               className="p-1 border-2 border-red-800 rounded-md"
            />
         </td>

         <td>{user.role === "USER" ? "کاربر عادی" : "مدیر"}</td>

         <td>
            <button
               className={styles.edit_btn}
               type="button"
               onClick={() => updateHandler(user._id, nameRef.current.value, emailRef.current.value,)}
            >
               ویرایش
            </button>
         </td>


         <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => changeRole(user._id)}
                  >
                    تغییر نقش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => removeHandler(user._id)}
                  >
                    حذف
                  </button>
                </td>
                
                <td>
                  <button
                    type="button"
                    onClick={() => banUser(user.email, user.phone)}
                    className={styles.delete_btn}
                  >
                    بن
                  </button>
                </td>

         
      </tr>
   );
}

export default TheRowBox;


