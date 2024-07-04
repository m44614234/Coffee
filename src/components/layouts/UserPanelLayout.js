import React from "react";
import styles from "./userPanelLayout.module.css";
import Sidebar from "@/components/modules/p-user/Sidebar";
import Topbar from "@/components/modules/p-user/Topbar";
import { redirect } from "next/navigation";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUser";
import UserModel from "@/models/User";
import UserImageModel from "@/models/UserImage"

const Layout = async ({ children }) => {
  
  const user = await authUser();
    const userImage = await UserImageModel.findOne({user : user?._id})



  if (user) {
    if (user.role != "ADMIN") {
      return redirect("/p-user");
    }
  }

  if (!user) {
    return redirect("/login-register");
  }

  connectToDB();
  const person = await UserModel.findOne({})
  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <Sidebar
          name={person.name}
          email={person.email}
          phone={person.phone}
          role={person.role}
        />
        <div className={styles.contents}>
          <Topbar
            name={person.name}
            email={person.email}
            phone={person.phone}
            role={person.role}
            image={userImage?.img}
          />
          {children}
        </div>
      </section>
    </div>
  );
};

export default Layout;
