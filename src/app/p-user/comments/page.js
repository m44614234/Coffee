import Layout from "@/components/layouts/UserPanelLayout";
import React from "react";
import Commentmodel from "@/models/Comment";
import DataTable from "@/components/templates/p-user/comments/DataTable";
import connectToDB from "@/configs/db";
import styles from "@/styles/p-user/answerTicket.module.css";
import { authUser } from "@/utils/authUser";

const page = async () => {
  connectToDB();

  const user = await authUser();

  const comments = await Commentmodel.find(
    { user: String(user._id) },
    "-__v"
  ).sort({_id : -1})
  .populate("productID", "name");

  console.log("comments =>", comments);

  return (
    <Layout>
      <main className="px-2">
       { 
    comments.length ? (
        <DataTable
          comments={JSON.parse(JSON.stringify(comments))}
          title="لیست کامنت‌ها"
        />
        ) :
        (<>
        
         <DataTable
          comments={JSON.parse(JSON.stringify(comments))}
          title="لیست کامنت‌ها"
        />
         <p className={styles.empty}>کامنتی وجود ندارد</p>
        
        </>)
        
      }
      </main>
      
    </Layout>
  );
};

export default page;
