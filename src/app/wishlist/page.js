import Footer from "@/components/modules/footer/Footer";
// import Navbar from "@/components/modules/navbar/Navbar";
import Product from "@/components/modules/product/Product";
import styles from "@/styles/wishlist.module.css";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import WishlistModel from "@/models/WishList";
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import { authUser } from "@/utils/authUser";

const page = async () => {
   const user = await authUser();

  let wishes = [];

   

  if (user) {
    wishes = await WishlistModel.find({ user: user._id })
      .populate("product", "name price score")
      .lean();
  }

  return (
    <div className="flex-col w-full ">
      {/* <Navbar  isLogin={user ? true : false}/> */}
      <Breadcrumb className="w-full flex" route={"علاقه مندی ها"} />
      <main className={styles.container} data-aos="fade-up">
        <p className={styles.title}>محصولات مورد علاقه شما</p>
        <section dir="rtl" className="flex flex-wrap w-full justify-start mx-auto">
          {wishes.length > 0 &&
            wishes.map((wish) => <Product key={wish._id}   {...wish.product} />)}
        </section>
      </main>

      {wishes.length === 0 && (
        <div className={styles.wishlist_empty} data-aos="fade-up">
          <FaRegHeart />
          <p>محصولی یافت نشد</p>
          <span>شما هنوز هیچ محصولی در لیست علاقه مندی های خود ندارید.</span>
          <span>در صفحه "فروشگاه" محصولات جالب زیادی پیدا خواهید کرد.</span>
          <div>
            <Link href="/category">بازگشت به فروشگاه</Link>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default page;
