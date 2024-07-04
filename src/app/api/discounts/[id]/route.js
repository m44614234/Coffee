import connectToDB from "@/configs/db";
import { isValidObjectId } from "mongoose";
import DiscountModel from "@/models/Discount";

export async function DELETE(req, { params }) {
  try {
    connectToDB();
    const id = params.id;
    if (!isValidObjectId(id)) {
      return Response.json({ message: "ID is not valid !!" }, { status: 422 });
    }
    await DiscountModel.findOneAndDelete({ _id: id });
    return Response.json({ message: "Discount deleted successfully :))" });
  } catch (err) {
    console.log("err => ", err);
    return Response.json({ message: err }, { status: 500 });
  }
}

