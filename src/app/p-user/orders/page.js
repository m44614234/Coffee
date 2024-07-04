
import Layout from "@/components/layouts/UserPanelLayout";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Table from "@/components/templates/cart/tabel/Tabel";
import styles from "@/styles/cart.module.css";
import { authUser } from "@/utils/authUser";
import Link from "next/link";
import { TbShoppingCartX } from "react-icons/tb";
import checkoutModel from "@/models/CheckoutUser";
const page = async () => {
  const user = await authUser()

  const checkoutUser = await checkoutModel.find({ user: user?._id }).sort({_id : -1})


  return (
    <Layout>
      {checkoutUser.length ? (
        <main className={styles.cart} data-aos="fade-up">
          <Table checkoutUser={JSON.parse(JSON.stringify(checkoutUser))} />
        </main>
      ) : (
        <div className={styles.cart_empty} data-aos="fade-up">
          <TbShoppingCartX />
          <p>سبد خرید شما در حال حاضر خالی است. </p>
          <span>
            قبل از تسویه حساب، باید چند محصول را به سبد خرید خود اضافه کنید.
          </span>
          <span>در صفحه "فروشگاه"، محصولات جالب زیادی خواهید یافت.</span>
          <div>
            <Link href="/category">بازگشت به فروشگاه</Link>
          </div>
        </div>
      )}

    </Layout>
  );
};

export default page;
