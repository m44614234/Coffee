import connectToDB from "@/configs/db";
import CheckOutModel from "@/models/CheckoutUser";
import { isAdmin } from "@/utils/authUser";

export async function PUT(req) {
  try {

    connectToDB();
    const body = await req.json();
    const { id } = body;
    // Validation (You)

    await CheckOutModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          completed : true,
        },
      }
    );
    return Response.json({ message: "CheckOutModel accepted successfully :))" });
  } catch (err) {
    console.log("err => ", err)
    return Response.json({ message: err }, { status: 500 });
  }
}
