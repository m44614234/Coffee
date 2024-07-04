import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/products/table.module.css";
import Table from "@/components/templates/p-admin/products/Table";
import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import Link from "next/link";

const page = async () => {
  connectToDB();
  const products = await ProductModel.find({}).sort({ _id: -1 }).lean();

  return (
    <Layout>

      <Link href="/p-admin/products/createProduct" className="bg-red-800 px-3 py-2 m-5 text-white ">ساخت محصول جدید</Link>
      
      <main>
        {products.length === 0 ? (
          <p className={styles.empty}>محصولی وجود ندارد</p>
        ) : (
          <Table
            products={JSON.parse(JSON.stringify(products))}
            title="لیست محصولات"
          />
        )}
      </main>
    </Layout>
  );
};

export default page;
