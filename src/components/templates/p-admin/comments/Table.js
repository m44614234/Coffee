"use client";
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import { showSwal } from "@/utils/helpers";
import swal from "sweetalert";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function DataTable({ comments, title }) {

  const router = useRouter();
  const showCommentBody = (body) => {
    showSwal(body, undefined, "خوندم");
  };

  const acceptComment = async (commentID) => {
    const res = await fetch("/api/comments/accept", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentID }),
    });

    if (res.status === 200) {
      swal({
        title: "کامنت مورد نظر با موفقیت تایید شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
    }
  };

  const rejectComment = async (commentID) => {
    const res = await fetch("/api/comments/reject", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentID }),
    });

    if (res.status === 200) {
      swal({
        title: "کامنت مورد نظر با موفقیت رد شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
    }
  };

  const removeHandler = async (commentID) => {
    const res = await fetch(`/api/comments/${commentID}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      swal({
        title: "کامنت مورد نظر با موفقیت حذف شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
    }
  };

  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>ایمیل</th>
              <th>امتیاز</th>
              <th>محصول</th>
              <th>تاریخ ثبت</th>
              <th>مشاهده</th>
              <th>حذف</th>
              <th>تایید</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={comment._id}>
                <td>{index + 1}</td>
                <td>{comment.username}</td>
                <td>{comment.email}</td>
                <td className="flex flex-row">
                  <div className="flex flex-row gap-1">
                    {new Array(comment.score).fill(0).map((index, i) => (
                      <FaStar key={index._id} className="text-yellow-500" />
                    ))}
                    {new Array(5 - comment.score).fill(0).map((index, i) => (
                      <FaRegStar key={index._id} />
                    ))}
                  </div>
                </td>

                <td>{comment.productID}</td>

                <td>{new Date(comment.date).toLocaleDateString("fa-IR")}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => showCommentBody(comment.body)}
                  >
                    مشاهده
                  </button>
                </td>

                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => removeHandler(comment._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  {comment.isAccept ? (
                    <button
                      type="button"
                      className="bg-green-700 text-white min-w-16 min-h-8 h-full"
                      onClick={() => rejectComment(comment._id)}
                    >
                      تایید
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bg-red-800 text-white min-w-16 min-h-8 h-full"
                      onClick={() => acceptComment(comment._id)}
                    >
                      رد
                    </button>
                  )}
                </td>

                <td>
                  <button type="button" className={styles.delete_btn}>
                    بن
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
