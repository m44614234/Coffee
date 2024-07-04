import connectToDB from "@/configs/db";
import OrdersModel from "@/models/Orders";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { user, product , complated , quantity } = body;

    if (!user || !product) {
      return Response.json(
        { message: "User and Product are required" },
        { status: 422 }
      )
    }

    // Validation (You)
    const order = await OrdersModel.findOne({ user, product });

    if (!order) {
      await OrdersModel.create({ user, product , complated , quantity });
    }


    return Response.json(
      { message: "Product Added to Basket successfully :))" },
      { status: 201 }
    );
  } catch (err) {
    console.log("err => ", err);
    return Response.json({ message: err }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    connectToDB();
    const orders = await OrdersModel.find();
    return Response.json({ orders }, { status: 200 });
  } catch (err) {
    console.log("err => ", err);
    return Response.json({ message: err }, { status: 500 });
  }
}