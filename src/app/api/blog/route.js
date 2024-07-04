import connectToDB from "@/configs/db";
import BlogModel from "@/models/Blog";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const user = formData.get("user");
    const title = formData.get("title");
    const subTitle = formData.get("subTitle");
    const body = formData.get("body");
    const tags = JSON.stringify(formData.get("tags"));
    const img = formData.get("img");

    formData.forEach((r, b) => console.log(r, b));

    const buffer = Buffer.from(await img.arrayBuffer());
    const filename = Date.now() + img.name;
    const imgPath = path.join(
      process.cwd(),
      "public/images/uploads/" + filename
    );

    await writeFile(imgPath, buffer);

    await BlogModel.create({
    user, title, subTitle, body, tags,
      img: `http://localhost:3000/images/uploads/${filename}`,
    });

    return Response.json(
      { message: "Blog created successfully :))", data: {} },
      { status: 201 }
    );
  } catch (err) {
    console.log("error => ", err);
    return Response.json({ message: err }, { status: 500 });
  }
}

// Image Uploader
export async function PUT(req) {
  const formData = await req.formData();
  const img = formData.get("img");

  // Validation
  if (!img) {
    return Response.json(
      { message: "Blog has not image !!" },
      { status: 400 }
    );
  }

  try {
    const buffer = Buffer.from(await img.arrayBuffer());
    const filename = Date.now() + img.name;

    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );

    // ✅
    return Response.json(
      { message: "File uploaded successfully :))" },
      { status: 201 }
    );
  } catch (err) {
    console.log("error => ", err);
    return Response.json({ message: err.message }, { status: 500 });
  }
}

export async function GET() {
  const blogs = await BlogModel.find({}, "-__v")
  return Response.json(blogs);
}
