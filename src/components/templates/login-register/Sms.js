"use client"
import { showSwal } from "@/utils/helpers";
import styles from "./sms.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Sms = ({ hideOtpForm, phone }) => {
const [code , setCode] = useState("")
const router = useRouter()

const verifyCode = async () => {

  const body =  { phone , code }

const res = await fetch("/api/auth/sms/verify" , {
  method : "POST" ,
  headers:{
"Content-Type" : "application/json"
  },body : JSON.stringify(body)
})
if(res.status === 409){
  return showSwal("کد تایید نا معتبر است","error","باشه")
  }else if(res.status === 410){
    return showSwal("کد تایید منقضی شده است","error","باشه")
    }else if(res.status === 200){
      return swal({
        title:"ثبت نام با موفقیت انجام شده است" ,
        icon:"success" ,
        buttons: "انتقال به پنل کاربری"
      }).then(()=>{
        router.replace("p-user")
      })

      }
}

  return (
    <>
      <div className={styles.form}>
        <p>کد تایید</p>
        <span className={styles.code_title}>
          لطفاً کد تأیید ارسال شده را تایپ کنید
        </span>
        <span className={styles.number}>{phone}</span>

        <input className={styles.input} type="text" value={code} 
        onChange={event => setCode(event.target.value)} />
        
        <button style={{ marginTop: "1rem" }} className={styles.btn} onClick={verifyCode}>
          ثبت کد تایید
        </button>
        <p className={styles.send_again_code}>ارسال مجدد کد یکبار مصرف</p>
      </div>
      <p onClick={hideOtpForm} className={styles.redirect_to_home}>
        لغو
      </p>
    </>
  );
};

export default Sms;
