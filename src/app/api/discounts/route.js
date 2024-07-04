import connectToDB from "@/configs/db";
import DiscountModel from "@/models/Discount";
import { isAdmin } from "@/utils/authUser";

export async function POST(req) {
  try {
    const Admin = await isAdmin()

    if(!Admin){
    throw new Error("this Api is Protected , you can't access this Api")
    }

    connectToDB();
    const body = await req.json();
    const { code, percent, maxUse } = body;

    // Validation (You) ✅

    await DiscountModel.create({
      code,
      percent,
      maxUse,
    });

    return Response.json(
      { message: "Discount code created successfully :))" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
