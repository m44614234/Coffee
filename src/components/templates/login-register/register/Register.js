import React from "react";
import styles from "./register.module.css";
import { useState } from "react";
import Sms from "../sms/Sms";
const Register = ({ showloginForm }) => {
  const [registerWithPass, setRegisterWithPass] = useState(false);
  const [registerWithCode, setRegisterWithCode] = useState(false);

  const hideCodeForm = () => setRegisterWithCode(false);
  return (
    <>
      {!registerWithCode ? (
        <>
          <div className={styles.form}>
            <input className={styles.input} type="text" placeholder="نام" />
            <input
              className={styles.input}
              type="text"
              placeholder="شماره موبایل  "
            />
            <input
              className={styles.input}
              type="email"
              placeholder="ایمیل (دلخواه)"
            />
            {registerWithPass && (
              <input
                className={styles.input}
                type="password"
                placeholder="رمز عبور"
              />
            )}
            {!registerWithPass && (
              <p
                onClick={() => setRegisterWithCode(true)}
                style={{ marginTop: "1rem" }}
                className={styles.btn}
              >
                ثبت نام با کد تایید
              </p>
            )}
            <button
              onClick={() => setRegisterWithPass(true)}
              style={{ marginTop: ".7rem" }}
              className={styles.btn}
            >
              ثبت نام با رمزعبور
            </button>
            <p onClick={showloginForm} className={styles.back_to_login}>
              برگشت به ورود
            </p>
          </div>
          <p onClick={showloginForm} className={styles.redirect_to_home}>
            لغو
          </p>
        </>
      ) : (
        <Sms number="09046417084" hideCodeForm={hideCodeForm} />
      )}
    </>
  );
};

export default Register;
