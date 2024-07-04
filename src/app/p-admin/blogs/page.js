import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/products/table.module.css";
import Table from "@/components/templates/p-user/blogs/Table";
import connectToDB from "@/configs/db";
import BlogModel from "@/models/Blog"
import Link from "next/link";
import { authUser } from "@/utils/authUser";

const page = async () => {
  connectToDB();

  const blogs = await BlogModel.find({}).sort({ _id: -1 }).lean();

  return (
    <Layout>

      
      <main>
        {blogs.length === 0 ? (
          <p className={styles.empty}>بلاگی وجود ندارد</p>
        ) : (
          <Table
            blogs={JSON.parse(JSON.stringify(blogs))}
            title="لیست بلاگ  ها"
          />
        )}
      </main>
    </Layout>
  );
};

export default page;
