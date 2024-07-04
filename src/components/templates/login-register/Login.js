import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Sms from "./Sms";
import { validateEmail, validatePassword } from "@/utils/auth";
import { showSwal } from "@/utils/helpers";

const Login = ({ showRegisterForm }) => {
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
  const [emailOrPhone , setEmailOrPhone]= useState("")
  const [password , setPassword]= useState("")
  const hideOtpForm = () => setIsLoginWithOtp(false);


const loginWithPassword = async () => {

  if(!emailOrPhone.trim()){
    return showSwal("لطفا ایمیل یا شماره همراه خود را وارد کنید","error" , "باشه")
}

if(!password.trim()){
  return showSwal("لطفا رمز عبور خود را وارد کنید","error" , "باشه")
}

// const isValidPhone = validatePhone(phone)
// if(!isValidPhone){
// return showSwal("شماره وارد شده صحیح نمی باشد!!","error" , "باشه")
// }

const isValidEmail = validateEmail(emailOrPhone)
if(!isValidEmail){
return showSwal("ایمیل وارد شده صحیح نمی باشد!!","error" , "باشه")
}

const isValidPassword = validatePassword(password)
if(!isValidPassword){
return showSwal("لطفا رمز عبور صحیح را وارد کنید","error" , "باشه")
}

const user =  {email : emailOrPhone , password}

const res = await fetch("/api/auth/signin" , {
  method:"POST" ,
  headers:{
    "Content-type" : "application/json"
  },
  body : JSON.stringify(user)      
})
if(res.status === 200){
    showSwal("ورود با موفقیت انجام شد.", "success" , "رفتن به پنل کاربری")
    setEmailOrPhone("")
    setPassword("")
    location.replace("/p-user")
} else if(res.status === 422 || res.status === 401){
  showSwal("کاربری با این مشخصات وجود ندارد")

}else if(res.status === 419 ){
  showSwal("اطلاعات به درستی وارد نشده اند")

}
}

  return (
    <>
      {!isLoginWithOtp ? (
        <>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="ایمیل/شماره موبایل"
            />
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور"
            />
            <div className={styles.checkbox}>
              <input type="checkbox" name="" id="" />
              <p>مرا به یاد داشته باش</p>
            </div>
            <button className={styles.btn} onClick={loginWithPassword}>ورود</button>
            <Link href={"/forget-password"} className={styles.forgot_pass}>
              رمز عبور را فراموش کرده اید؟
            </Link>
            <button
              onClick={() => setIsLoginWithOtp(true)}
              className={styles.btn}
            >
              ورود با کد یکبار مصرف
            </button>
            <span>ایا حساب کاربری ندارید؟</span>
            <button onClick={showRegisterForm} className={styles.btn_light}>
              ثبت نام
            </button>
          </div>
          <Link href={"/"} className={styles.redirect_to_home}>
            لغو
          </Link>
        </>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
    </>
  );
};

export default Login;
