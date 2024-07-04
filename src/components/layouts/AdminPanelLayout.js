import React from "react";
import styles from "./adminPanelLayout.module.css";
import Sidebar from "@/components/modules/p-admin/Sidebar";
import Topbar from "@/components/modules/p-admin/Topbor";
import UserModel from "@/models/User";
import { authUser } from "@/utils/authUser";
import connectToDB from "@/configs/db";
import UserImageModel from "@/models/UserImage";

const Layout = async ({ children }) => {
  const user = await authUser();

  const userImage = await UserImageModel.findOne({ user: user?._id });

  if (user) {
    if (user.role != "ADMIN") {
      return redirect("/p-user");
    }
  }

  if (!user) {
    return redirect("/login-register");
  }

  connectToDB();
  const person = await UserModel.findOne({});

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
            image={userImage?.img}
            name={person.name}
            email={person.email}
            phone={person.phone}
            role={person.role}
          />
          {children}
        </div>
      </section>
    </div>
  );
};

export default Layout;
