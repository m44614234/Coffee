import connectToDB from "@/configs/db";
import BanModel from "@/models/Ban";
import { isAdmin } from "@/utils/authUser";

export async function POST(req) {
  try {
    const Admin = await isAdmin()

    if(!Admin){
    throw new Error("this Api is Protected , you can't access this Api")
    }

    connectToDB();
    const body = await req.json();
    const { email, phone } = body;

    // Validation (You) ✅

    await BanModel.create({ email, phone });

    return Response.json({ message: "User banned successfully :))" });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
