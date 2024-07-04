"use client"
import { IoMdStar } from "react-icons/io";
import styles from "./form.module.css";
import { useState } from "react";
import { showSwal } from "@/utils/helpers";
import { useRouter } from "next/navigation";

const Form = ({blogID ,commentUser}) => {
    const router = useRouter()

    
  const [form, setForm] = useState({
    user: commentUser,
    blog: blogID ,
    body: "",
    email: "",
    userName: "",
  });

  const AddComment = async () => {
    const res = await fetch("/api/commentBlog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.status === 201) {
      setForm({
        user: commentUser,
        blog: blogID,
        body: "",
        email: "",
        name: "",
      });
    swal({
      title: "دیدگاه شما با موفقیت ثبت شد",
      icon: "success",
      buttons: "باشه",
    }).then(() => {
        router.refresh()
    })
    }
  };

  return (
    <div className={styles.form}>
      <p className={styles.title}>دیدگاه خود را بنویسید</p>
      <p>
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span style={{ color: "red" }}>*</span>
      </p>
  
      <div className={styles.group}>
        <label htmlFor="">
          دیدگاه شما
          <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          id="comment"
          name="comment"
          cols="45"
          rows="8"
          required=""
          placeholder=""
        ></textarea>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label htmlFor="">
            نام
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            type="text"
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="">
            ایمیل
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
          />
        </div>
      </div>
      <div className={styles.checkbox}>
        <input type="checkbox" name="" id="" />
        <p>
          {" "}
          ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
          می‌نویسم.
        </p>
      </div>
      <button className="text-white" onClick={AddComment}> ثبت کامنت</button>
    </div>
  );
};

export default Form;
