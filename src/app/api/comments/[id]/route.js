import connectToDB from "@/configs/db";
import { isValidObjectId } from "mongoose";
import CommentModel from "@/models/Comment";

export async function DELETE(req, { params }) {
  try {
    connectToDB();
    const id = params.id;
    if (!isValidObjectId(id)) {
      return Response.json({ message: "ID is not valid !!" }, { status: 422 });
    }
    await CommentModel.findOneAndDelete({ _id: id });
    return Response.json({ message: "Comment deleted successfully :))" });
  } catch (err) {
    console.log("err => ", err);
    return Response.json({ message: err }, { status: 500 });
  }
}

