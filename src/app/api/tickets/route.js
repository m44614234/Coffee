import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";
import UserModel from "@/models/User";
import TicketModel from "@/models/Ticket";
import connectToDB from "@/configs/db";

export async function POST(req) {
  try {
  

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

    const reqBody = await req.json() 
    const { title, body, department, subDepartment, priority } = reqBody;


    await TicketModel.create({
      title,
      body,
      department,
      subDepartment,
      priority,
      user: user._id,
    });

    return Response.json(
        { message: "Ticket Save successfully :))" },
        { status: 201 }
      );    
  } catch (error) {
    return Response.json(
      { message: "error =>", error },
      {
        status: 500
      }
    );
  }
}
