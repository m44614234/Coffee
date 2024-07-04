import OrderModel from "@/models/Orders";
import connectToDB from "@/configs/db";
import { isValidObjectId } from "mongoose";

export async function DELETE(req, { params }) {
  try {
    connectToDB();

    const id = params.id;

    if (!isValidObjectId(id)) {
      return Response.json({ message: "ID is not valid !!" }, { status: 422 });
    }

    await OrderModel.findOneAndDelete({ _id: id });
    return Response.json({ message: "Order Deleted Successfully :))" });
  } catch (err) {
    console.log("err => ", err);
    return Response.json({ message: err }, { status: 500 });
  }
}
