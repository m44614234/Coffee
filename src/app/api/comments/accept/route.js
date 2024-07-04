import connectToDB from "@/configs/db";
import CommentModel from "@/models/Comment";
import { isAdmin } from "@/utils/authUser";

export async function PUT(req) {
  try {

    const Admin = await isAdmin()

    if(!Admin){
    throw new Error("this Api is Protected , you can't access this Api")
    }

    connectToDB();
    const body = await req.json();
    const { id } = body;
    // Validation (You)

    await CommentModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isAccept: true,
        },
      }
    );
    return Response.json({ message: "Comment accepted successfully :))" });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
