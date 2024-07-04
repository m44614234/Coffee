import Footer from "@/components/modules/footer/Footer"
import Stepper from "@/components/modules/stepper/Stepper"
import Complate from "@/components/templates/p-user/orders/complate-order/Table"
import styles from '@/styles/complate-order.module.css'  
import { authUser } from "@/utils/authUser"
import CheckOutModel from "@/models/CheckoutUser"
import OrderModel from "@/models/Orders";
import WishListModel from "@/models/WishList";
import Navbar from "@/components/modules/navbar/Navbar"

const page =  async () => { 
    const user = await authUser() 

    const wishList = await WishListModel.find({ user: user?._id }) 

    const orderProductLength = await OrderModel.find({ user: user?._id })
      .populate("product")
      .lean()

    // const orders = await OrderModel.find({user : user?._id})
    // .populate("product")
    // .lean()


    let checkoutItem = await CheckOutModel.findOne({user : user?._id})
    .populate("order")
    .lean()
    

    return (
        <>
        <Navbar
       isLogin={user ? true : false}
      orderProductLength={orderProductLength.length}
      wishList_Length={wishList.length} />

            <Stepper step="complate" />
            <main className={styles.container} data-aos="fade-left">
               <Complate complate_order={checkoutItem}  />
            </main>

            <Footer />
        </>
    )
}

export default page
