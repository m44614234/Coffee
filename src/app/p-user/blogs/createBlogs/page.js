import Layout from "@/components/layouts/UserPanelLayout";
import CreateBlog from "@/components/templates/p-user/blogs/CreateBlog";
import BlogModel from "@/models/Blog"
import { authUser } from "@/utils/authUser";
const page = async () => {

  const user = await authUser();

  // const userBlog = await BlogModel.findOne({user : user._id})
  // .populate("user")

  const userID = user._id

  console.log("userID => " , userID)
 
  return (
    <Layout>
      <CreateBlog userID={userID} />
    </Layout>
  );
};

export default page;
