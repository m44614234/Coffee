import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import { isValidObjectId } from "mongoose";

export async function DELETE(req, { params }) {
  try {
    connectToDB();
    const id = params.id;
    if (!isValidObjectId(id)) {
      return Response.json({ message: "ID is not valid !!" }, { status: 422 });
    }
    await ProductModel.findOneAndDelete({ _id: id });
    return Response.json({ message: "Product deleted successfully :))" });
  } catch (err) {
    console.log("err => ", err);
    return Response.json({ message: err }, { status: 500 });
  }
}


export async function PUT(req, { params }) {
  const body = await req.json();
  const { name, price } = body;

  try {
    connectToDB();
    const id = params.id;
    if (!isValidObjectId(id)) {
      return Response.json({ message: "ID is not valid !!" }, { status: 422 });
    }
    const product = await ProductModel.findById(id);
    if (!product) {
      return Response.json(
        { message: "Product not found !!" },
        { status: 404 }
      );
    }

    await ProductModel.findByIdAndUpdate(id, { name, price }, { new: true });
    return Response.json(
      { message: "Product updated successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    console.log("error => ", err);
    return Response.json(
      { message: "Something went wrong =>", err },
      { status: 500 }
    );
  }
}
