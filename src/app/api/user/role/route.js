import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { isAdmin } from "@/utils/authUser";

export async function PUT(req) {
  try {
    const Admin = await isAdmin()

    if(!Admin){
    throw new Error("this Api is Protected , you can't access this Api")
    }

    connectToDB();
    const body = await req.json();
    const { id } = body;

    const user = await UserModel.findOne({ _id: id }).lean();
    await UserModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          role: user.role === "USER" ? "ADMIN" : "USER",
        },
      }
    );

    return Response.json({ message: "User role updated successfully" });
  } catch (err) {
    return Response.json(
      { message: err },
      {
        status: 500,
      }
    );
  }
}
