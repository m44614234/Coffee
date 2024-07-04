import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb"
import Footer from "@/components/modules/footer/Footer"
import styles from '@/styles/category.module.css'
import { authUser } from "@/utils/authUser"
import OrderModel from "@/models/Orders";
import WishListModel from "@/models/WishList";
import Navbar from "@/components/modules/navbar/Navbar"
import BlogModel from "@/models/Blog";
import Articles from "@/components/templates/index/articles/Articles";


const page = async() => {
   const user = await authUser()

   const blogs = await BlogModel.find({}).sort({ _id: -1 })
   .populate("user")
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
      
                  <Breadcrumb route={'مقالات'} />
            <main className={styles.container} data-aos="fade-up">
                <div className={styles.category}>
                <Articles blogs={JSON.parse(JSON.stringify(blogs))} />
                </div>
            </main> 
            <Footer />
        </>
    )
}

export default page
