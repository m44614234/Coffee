import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";
import UserModel from "@/models/User";
import connectToDB from "@/configs/db";

export async function GET(req) {
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

    return Response.json(user);
    
  } catch (error) {
    return Response.json(
      { message: "error =>", error },
      {
        status: 500
      }
    );
  }
}
