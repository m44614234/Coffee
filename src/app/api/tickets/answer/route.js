import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import UserModel from "@/models/User";
import { verifyAccessToken } from "@/utils/auth";
import { isAdmin } from "@/utils/authUser";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const Admin = await isAdmin()

    if(!Admin){
    throw new Error("this Api is Protected , you can't access this Api")
    }

    connectToDB();


    const token = cookies().get("token");
    let user = null;

    if (token) {
      const tokenPayload = verifyAccessToken(token.value);
      if (tokenPayload) {
        user = await UserModel.findOne(
          { email: tokenPayload.email },
          "-password -refreshToken -__v"
        );
      }
    }

    const reqBody = await req.json();
    const { title, body, department, subDepartment, priority, ticketID } =
      reqBody;

     
    await TicketModel.create({
      title,
      body,
      department,
      subDepartment,
      priority,
      user: user._id,
      hasAnswer: false,
      isAnswer: true,
      mainTicket: ticketID,
    });

    return Response.json(
      { message: "Answer saved successfully :))" },
      { status: 201 }
    );
  } catch (err) {
    console.log("err =>" , err)
    return Response.json({ message: err }, { status: 500 });
  }
}
