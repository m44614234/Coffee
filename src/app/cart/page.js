import Footer from "@/components/modules/footer/Footer";
import Stepper from "@/components/modules/stepper/Stepper";
import Table from "@/components/templates/cart/Table";
import styles from "@/styles/cart.module.css";
import { authUser } from "@/utils/authUser";
import OrderModel from "@/models/Orders";
import WishListModel from "@/models/WishList";
import Navbar from "@/components/modules/navbar/Navbar"
const page =  async () => {

  const user = await authUser();
  const wishList = await WishListModel.find({ user: user?._id }) 

  const orderProductLength = await OrderModel.find({ user: user?._id })
    .populate("product")
    .lean()

  const orders = await OrderModel.find({user : user?._id})
  .populate("product")
  .lean()

  
  return (
    <>
    <Navbar
       isLogin={user ? true : false}
      orderProductLength={orderProductLength.length}
      wishList_Length={wishList.length} />

      <Stepper step="cart" />

      <main className={styles.cart} data-aos="fade-up">
        <Table  orders={JSON.parse(JSON.stringify(orders))}
         />
      </main>

      
      <Footer />
    </>
  );
};

export default page;
