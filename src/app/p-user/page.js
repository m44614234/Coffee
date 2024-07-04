import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/index.module.css";
import Tickets from "@/components/templates/p-user/index/Tickets";
import Orders from "@/components/templates/p-user/index/Orders";
import TicketModel from "@/models/Ticket"
import CommentModel from "@/models/Comment"
import WishListModel from "@/models/WishList"
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";
import Box from "@/components/modules/infoBox/InfoBox";
import { redirect } from "next/navigation";
import { authUser } from "@/utils/authUser";
import CheckOutModel from "@/models/CheckoutUser"
const page = async () => {

  const user = await authUser()


  if(!user){
    return redirect("/login-register")
    }

  const tickets =  await TicketModel.find({user : user._id})
  .limit(3)
  .populate("department" , "title")
  .sort({_id : -1})
  .lean()
  
  const allTickets =  await TicketModel.find({user : user._id})
  const wishes =  await WishListModel.find({user : user._id})
  const comments =  await CommentModel.find({user : String(user._id)})

  const checkOut = await CheckOutModel.find({user : user._id})

  return (
    <Layout>
      <main className="">
        <section className={styles.boxes}>
          <Box title="مجموع تیکت ها " value={allTickets.length}/>
          <Box title="مجموع کامنت ها " value={comments.length} />
          <Box title="مجموع سفارشات"  value={checkOut.length}/>
          <Box title="مجموع علاقه مندی ها" value={wishes.length} />
        </section>
        <section className={styles.contents}>
            <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
            <Orders />
        </section>
      </main>
    </Layout>
  );
};

export default page;
