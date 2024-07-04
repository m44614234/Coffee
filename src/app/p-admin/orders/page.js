import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/styles/cart.module.css";
import Table from "@/components/templates/cart/tabel/Tabel";
import checkoutModel from "@/models/CheckoutUser";
import { TbShoppingCartX } from "react-icons/tb";

const page = async () => {

  const checkoutUser = await checkoutModel.find().sort({ _id: -1 }).lean();

  return (
    <Layout>
      {checkoutUser.length ? (
        <main className={styles.cart} data-aos="fade-up">
          <Table checkoutUser={JSON.parse(JSON.stringify(checkoutUser))} />
        </main>
      ) : (
        <div className={styles.cart_empty} data-aos="fade-up">
          <TbShoppingCartX />
          <p>سفارشات در حال حاضر خالی است. </p>
        </div>
      )}
    </Layout>
  );
};

export default page;
