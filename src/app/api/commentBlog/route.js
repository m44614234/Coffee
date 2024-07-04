import connectToDB from "@/configs/db"
import CommentBlog from "@/models/CommentBlog"
import BlogModel from "@/models/Blog";


export async function POST(req){


try {
 

  connectToDB()
const reqBody = await req.json()

const { user, blog, body, email, userName   } = reqBody


const comment = await CommentBlog.create({
  user, blog, body, email, userName 
})


    return Response.json(
        { message: "CommentBlog Add Successfully :))", data: comment },
        {
          status: 201
        }
      );
}
 catch (error) {
  console.log("error => ", error);

    return Response.json(    
        { message: "Error Add Comment :(" , error},
        {
          status: 500
        }
      );
}
}

export async function GET() {
  await CommentModel.findOneAndUpdate(
    {},
    {
      isAccept: true,
    }
  );
  const comments = await CommentModel.find({}, "-__v");
  return Response.json(comments);
}