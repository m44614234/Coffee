import UserImageModel from "@/models/UserImage" 
import { writeFile } from "fs/promises";
import { cookies } from "next/headers";
import path from "path";
import connectToDB from "@/configs/db";


export async function POST(req) {
  try {
    connectToDB();
    const formData = await req.formData();
    const img = formData.get("img");
    const user = formData.get("user");

    formData.forEach((r, b) => console.log(r, b));

    const buffer = Buffer.from(await img.arrayBuffer());
    const filename = Date.now() + img.name;
    const imgPath = path.join(
      process.cwd(),
      "public/images/uploads/" + filename
    );

    await writeFile(imgPath, buffer);

    await UserImageModel.create({
      img: `http://localhost:3000/images/uploads/${filename}`,
      user
    });

    return Response.json(
      { message: "Image User Update successfully :))", data : {} },
      { status: 201 }
    );
  } catch (err) {
    console.log("error_______ => ", err);
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
      { message: "it isn't Image User !!" },
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
