import Layout from "@/components/layouts/UserPanelLayout";
import AccountDetails from "@/components/templates/details/AccountDetails";
import { authUser } from "@/utils/authUser";
import UserImageModel from "@/models/UserImage"

const page = async () => {
  const user = await authUser();
    const userImage = await UserImageModel.findOne({user : user?._id})

  return (
    <Layout>
      <AccountDetails userID={user?._id}  userImage={userImage?.img}/>
    </Layout>
  );
};

export default page;
