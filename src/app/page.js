import Footer from "@/components/modules/footer/Footer";
import Articles from "@/components/templates/index/articles/Articles";
import Banner from "@/components/templates/index/banner/Banner";
import Latest from "@/components/templates/index/latest/Latest";
import Promote from "@/components/templates/index/promote/Promote";
import ProductModel from "@/models/Product";
import { authUser } from "@/utils/authUser";
import Navbar from "@/components/modules/navbar/Navbar"
import BlogModel from "@/models/Blog";
import OrderModel from "@/models/Orders";
import WishListModel from "@/models/WishList";

export default async function Home() {
  const user = await authUser();
  console.log("user =>", user);

  const latestProducts = await ProductModel.find({}).sort({ _id: -1 }).limit(8);

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
      <Banner />
      <Latest products={JSON.parse(JSON.stringify(latestProducts))} />
      <Promote />
      <Articles blogs={JSON.parse(JSON.stringify(blogs))} />
      <Footer />
    </>
  );
}
