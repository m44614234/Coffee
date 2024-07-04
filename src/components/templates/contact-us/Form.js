"use client"
import { useState } from "react";
import styles from "./form.module.css";
import { showSwal } from "@/utils/helpers";

const Form = () => {

const [email,setEmail] = useState("")
const [name,setName] = useState("")
const [message,setMessage] = useState("")
const [compony,setCompony] = useState("")
const [phone,setPhone] = useState("")

const submitMessage = async (e) => {
e.preventDefault()

const items = {
  email,
  name,
  message,
  compony,
  phone
}

const res = await fetch("/api/contact" , {
  method : "POST" , 
  headers : {
    "Content-Type" : "application/json"
  },
  body:JSON.stringify(items)
})
if (res.status === 201) {
  showSwal("در اسرع وقت با شما تماس خواهیم گرفت.", "success", "فهمیدم");
setEmail("")
setName("")
setMessage("")
setCompony("")
setPhone("")
}
}

  return (
    <form className={styles.form}>
      <span>فرم تماس با ما</span>
      <p>برای تماس با ما می توانید فرم زیر را تکمیل کنید</p>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>نام و نام خانوادگی</label>
          <input type="text"  value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className={styles.group}>
          <label>آدرس ایمیل</label>
          <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>شماره تماس</label>
          <input type="text"  value={phone} onChange={(e)=>setPhone(e.target.value)}/>
        </div>
        <div className={styles.group}>
          <label>نام شرکت</label>
          <input type="text" value={compony} onChange={(e)=>setCompony(e.target.value)} />
        </div>
      </div>
      <div className={styles.group}>
        <label>درخواست شما</label>
        <textarea name="" id="" value={message} onChange={(e)=>setMessage(e.target.value)} cols="30" rows="3"></textarea>
      </div>
      <button onClick={submitMessage}>ارسال</button>
    </form>
  );
};

export default Form;
