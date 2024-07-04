import React from "react";
import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/components/templates/p-admin/products/table.module.css";
import Table from "@/components/templates/p-user/blogs/Table";
import connectToDB from "@/configs/db";
import BlogModel from "@/models/Blog"
import Link from "next/link";
import { authUser } from "@/utils/authUser";

const page = async () => {
  connectToDB();
  const user = await authUser()

  const blogs = await BlogModel.find({user : user._id})
  .sort({_id : -1})


  return (
    <Layout>

      <Link href="/p-user/blogs/createBlogs" className="bg-red-800 px-3 py-2 m-5 text-white ">ایجاد مقاله جدید</Link>
      
      <main>
        {blogs.length === 0 ? (
          <p className={styles.empty}>مقاله ای وجود ندارد</p>
        ) : (
          <Table
            blogs={JSON.parse(JSON.stringify(blogs))}
            title="لیست مقالات من"
          />
        )}
      </main>
    </Layout>
  );
};

export default page;
