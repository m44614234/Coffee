import connectToDB from "@/configs/db";
import { isValidObjectId } from "mongoose";
import UserModel from "@/models/User";
export async function DELETE(req, { params }) {
  try {
    connectToDB();
    const id = params.id;
    if (!isValidObjectId(id)) {
      return Response.json({ message: "ID is not valid !!" }, { status: 422 });
    }
    await UserModel.findOneAndDelete({ _id: id });
    return Response.json({ message: "User Deleted successfully :))" });
  } catch (err) {
    console.log("err => ", err);
    return Response.json({ message: err }, { status: 500 });
  }
}


export async function PUT(req, { params }) {
  const body = await req.json();
  const { name, email } = body;
  try {
    connectToDB();
    const id = params.id;
    if (!isValidObjectId(id)) {
      return Response.json({ message: "ID is not valid !!" }, { status: 422 });
    }
    const user = await UserModel.findById(id);

    if (!user) {
      return Response.json(
        { message: "User not found !!" },
        { status: 404 }
      );
    }

    await UserModel.findByIdAndUpdate(id, { name, email }, { new: true });

    return Response.json(
      { message: "User updated successfully :))", user },
      { status: 200 }
    );
  } catch (err) {
    console.log("error => ", err);
    return Response.json({ message: err }, { status: 500 });
  }
}