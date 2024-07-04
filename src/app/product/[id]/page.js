import styles from "@/styles/product.module.css";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import MoreProducts from "@/components/templates/product/MoreProducts";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import { authUser } from "@/utils/authUser";
import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import OrderModel from "@/models/Orders";
import WishListModel from "@/models/WishList";

const product = async ({ params }) => {
  const user = await authUser();

  connectToDB();

  const productID = params?.id;
  const product = await ProductModel.findOne({ _id: productID }).populate(
    "comments"
  );

  const relateProduct = await ProductModel.find({ smell: product?.smell });

  const wishList = await WishListModel.find({ user: productID }) 

  const orderProductLength = await OrderModel.find({ user: productID })
    .populate("product")
    .lean()

  return (
  <>
  
  <Navbar
     isLogin={user ? true : false}
    orderProductLength={orderProductLength.length}
    wishList_Length={wishList.length} />

  <div className={styles.container}>
          <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details
            product={JSON.parse(JSON.stringify(product))}
            productID={productID}
            isLogin={user ? true : false}
            person = {user?._id}
          />
          <Gallery productImage={product?.img} />
        </div>
        <Tabs product={JSON.parse(JSON.stringify(product))} />
        <MoreProducts
          relateProduct={JSON.parse(JSON.stringify(relateProduct))}
        />
      </div>
      <Footer />
    </div>
  </>
    
  );
};

export default product;
