import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb"
import Footer from "@/components/modules/footer/Footer"
import Products from "@/components/templates/category/products/Products"
import styles from '@/styles/category.module.css'
import ProductsModel from "@/models/Product"
import { authUser } from "@/utils/authUser"
import OrderModel from "@/models/Orders";
import WishListModel from "@/models/WishList";
import Navbar from "@/components/modules/navbar/Navbar"

const page = async() => {
    const user = await authUser()

    const products = await ProductsModel.find({})

    const wishList = await WishListModel.find({ user: user?._id }) 

    const orderProductLength = await OrderModel.find({ user: user?._id })
      .populate("product")
      .lean()


    return (
        <>
<Navbar
       isLogin={user ? true : false}
      orderProductLength={orderProductLength.length}
      wishList_Length={wishList.length} />
      
                  <Breadcrumb route={'فروشگاه'} />
            <main className={styles.container} data-aos="fade-up">
                <div className={styles.category}>
                    <Products products={products} user={user} />
                </div>
            </main> 
            <Footer />
        </>
    )
}

export default page
