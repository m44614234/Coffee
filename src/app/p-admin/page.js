import React from "react";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout";
import styles from "@/styles/p-admin/index.module.css";
import Box from "@/components/modules/infoBox/InfoBox";
import TicketModel from "@/models/Ticket";
import ProductModel from "@/models/Product";
import UserModel from "@/models/User";
import SaleChart from "@/components/templates/p-admin/index/SaleChart";
import GrowthChart from "@/components/templates/p-admin/index/GrowthChart";
import { redirect } from "next/navigation";
import { authUser } from "@/utils/authUser";
import CheckOutModel from "@/models/CheckoutUser"
import connectToDB from "@/configs/db";

async function AdminHomePage() {
  const user = await authUser();

  if (user) {
    if (user.role != "ADMIN") {
      return redirect("/p-user");
    }
  }

  if (!user) {
    return redirect("/login-register");
  }

  const tickets = await TicketModel.find({}).lean();
  const users = await UserModel.find({}).lean();
  const products = await ProductModel.find({}).lean();
  const checkouts = await CheckOutModel.find({}).lean()

  return (
    <AdminPanelLayout>
      <main>
        <section className={styles.dashboard_contents}>
          <Box title="مجموع تیکت های دریافتی" value={tickets.length} />
          <Box title="مجموع محصولات سایت" value={products.length} />
          <Box title="مجموع سفارشات" value={checkouts.length} />
          <Box title="مجموع کاربر های سایت" value={users.length} />
        </section>{" "}
        <div className={styles.dashboard_charts}>
          <section>
            <p>آمار فروش</p>
            <SaleChart />
          </section>
          <section>
            <p>نرخ رشد</p>
            <GrowthChart />
          </section>
        </div>
      </main>
    </AdminPanelLayout>
  );
}

export default AdminHomePage;
