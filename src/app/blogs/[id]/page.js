import styles from "@/styles/product.module.css";
import Footer from "@/components/modules/footer/Footer";
import { authUser } from "@/utils/authUser";
import connectToDB from "@/configs/db";
import BlogModel from "@/models/Blog";
import CommentBlog from "@/models/CommentBlog"
import Details from "@/components/templates/article/details/Details"
import Comments from "@/components/templates/article/comments/comments/Comments";
import OrderModel from "@/models/Orders";
import Navbar from "@/components/modules/navbar/Navbar";
import WishListModel from "@/models/WishList";


    
const blog = async ({ params }) => {

  connectToDB();

  const user = await authUser();
  const commentUser = user?._id

  const blogID = params?.id;

  const blog = await BlogModel.findOne({ _id: blogID   })
  .populate("user")


  const blogComments = await CommentBlog.find({ blog : blogID })
  .populate("blog")
  .lean()

  const productID = params?._id;

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
      <Details 
       title={blog?.title}
       subTitle={blog?.subTitle}
                img={blog?.img}
                comments={blog?.comments}
                date={blog?.createdAt}
                _id={blog?._id}
                tags={blog?.tags}
                 body={blog?.body}
                userName={blog?.user?.name}/> 

                

                <Comments blogComments={blogComments} blogID={blogID} commentUser={commentUser} /> 
                

      <Footer />
    </div>
    </>
  );
};

export default blog;
