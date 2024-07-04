import Footer from "@/components/modules/footer/Footer";
import Stepper from "@/components/modules/stepper/Stepper";
import styles from "@/styles/checkout.module.css";
import Order from "@/components/templates/checkout/order/Order";
import Details from "@/components/templates/checkout/details/Details";
import { authUser } from "@/utils/authUser";
import OrderModel from "@/models/Orders";
import CheckOutModel from "@/models/Orders";
import WishListModel from "@/models/WishList";
import Navbar from "@/components/modules/navbar/Navbar";

const page = async () => {
  const user = await authUser();

  const wishList = await WishListModel.find({ user: user?._id });

  const orderProductLength = await OrderModel.find({ user: user?._id })
    .populate("product")
    .lean();

  const orders = await OrderModel.find({ user: user?._id })
    .populate("product")
    .lean();

  let checkoutItem = await CheckOutModel.find({ user: user?._id })
    .populate("product")
    .lean();

  checkoutItem = [...orders];

  console.log("checkoutItem Model => ", checkoutItem);

  return (
    <>
      <Navbar
        isLogin={user ? true : false}
        orderProductLength={orderProductLength.length}
        wishList_Length={wishList.length}
      />
      <Stepper step="checkout" />
      <div className={styles.container} data-aos="fade-up">
        <main className={styles.checkout}>
          <Order orders={checkoutItem} />
          <Details
            checkoutItems={checkoutItem.map((checkout) => checkout.product)}
            orders={checkoutItem}
            userID={user?._id}
          />
        </main>
      </div>

      <Footer />
    </>
  );
};

export default page;
