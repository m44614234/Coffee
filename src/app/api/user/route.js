import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { authUser } from "@/utils/authUser";

export async function POST(req) {
  try {
    connectToDB();
    const user = await authUser();
    const body = await req.json();
    const { name, email, phone } = body;


    await UserModel.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          name,
          email,
          phone,
        },
      }
    );

    return Response.json(
      { message: "User updated successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    console.log("err1 => " ,err)
    return Response.json({ message: err }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const Admin = await isAdmin()

    if(!Admin){
    throw new Error("this Api is Protected , you can't access this Api")
    }
    
    connectToDB();
   const body = await req.json();
    const { id } = body;

    console.log("body => " , body)

    await UserModel.findOneAndDelete({ _id: id });
    return Response.json({ message: "User removed successfully :))" });
  } catch (err) {
    console.log("err2 => " ,err)
    return Response.json({ message: err }, { status: 500 });
  }
}