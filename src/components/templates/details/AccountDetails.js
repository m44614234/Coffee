"use client";
import React, { useEffect } from "react";
import styles from "@/styles/p-user/accountDetails.module.css";
import swal from "sweetalert";
import { useState } from "react";


function AccountDetails({userID , userImage}) {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(userID);
  const [imagename, setimagename] = useState("");

 

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
    };
    getUser();
  }, []);

  const updateUser = async () => {
    // Validation (You)

    const userNewInfos = {
      name,
      email,
      phone,
    };

    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(userNewInfos),
    });

    if (res.status === 200) {
      swal({
        title: "اطلاعات مورد نظر با موفقیت آپدیت شد",
        icon: "success",
        buttons: "فهمیدم",
      });
      // .then(async (result) => {
      //   await fetch("/api/auth/signout", { method: "POST" });
      //   location.replace("/login-register");
      // });
    }
  };

const changeUserImage = async (event) => {
  const formData = new FormData();
  formData.append("img",imagename);
  formData.append("user",user);

  const res = await fetch("/api/user/update-img-user", {
    method: "POST",
    body: formData,
  });

  if (res.status === 201) {
    
    console.log(res.data)
    swal({
      title: " تصویر کاربر با موفقیت آپدیت شد",
      icon: "success",
      buttons: "فهمیدم",
    });
  }



}



  
  return (
    <main>
      <div className={styles.details}>
        <h1 className={styles.title}>
          <span> جزئیات اکانت</span>
        </h1>
        <div className={styles.details_main}>
          <section>
            <div>
              <label>نام کاربری</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="لطفا نام کاربری خود را وارد کنید"
                type="text"
              />
            </div>
            <div>
              <label>ایمیل</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="لطفا ایمیل خود را وارد کنید"
                type="text"
              />
            </div>
            <div>
              <label>شماره تماس</label>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="لطفا شماره تماس خود را وارد کنید"
                type="number"
              />
            </div>
            <button
          type="submit"
          onClick={updateUser}
          className="flex-auto bg-red-900 rounded-md py-2 px-6 text-white mt-2"
        >
          ثبت تغییرات
        </button>
          </section>

          <section>
        {userImage ? (
          <div>
          <img
            fill
            src={
              userImage
                ? userImage
                : "/images/user.png"
            }
            className="w-96 h-96 flex justify-center
            border-2 border-solid border-green-900  rounded-full"
          />
        </div>
        ):(
<form
              onSubmit={changeUserImage}
              className=" w-full  flex flex-wrap justify-start items-center"
            >
              <div className=" flex flex-wrap justify-start w-full items-center">
                <div>
                  <img
                    fill
                    src={
                      userImage
                        ? userImage
                        : "/images/user.png"
                    }
                    className="w-52 h-52 flex justify-center
                    border-2 border-solid border-green-900 rounded-full"
                  />
                </div>
                <div>
                  <div className=" w-88 h-88 flex gap-2  justify-center items-center">
                    <input
                      onChange={(e) => {
                        setimagename(e.target.files[0]);
                      }}
                      id="file"
                      type="file"
                      name="file"
                    />
                    <button
                      type="button"
                      className=" w-24 min-w-24  h-10 flex justify-center items-center rounded-md bg-red-900 text-white transition-all duration-300 hover:bg-blue-600"
                      onClick={changeUserImage}
                    >
                      ذخیره عکس
                    </button>
                  </div>
                </div>
              </div>
            </form>
        )}
            
{/* 
            <div>
              <label>رمز عبور</label>
              <div className={styles.password_group}>
                <input type="password" />
                <button>تغییر رمز عبور</button>
              </div>
            </div> */}
          </section>
        </div>
       
      </div>
    </main>
  );
}

export default AccountDetails;
