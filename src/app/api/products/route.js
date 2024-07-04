import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    // connectToDB();
    const formData = await req.formData();
    const name = formData.get("name");
    const price = formData.get("price");
    const quantity = formData.get("quantity");
    const shortDescription = formData.get("shortDescription");
    const longDescription = formData.get("longDescription");
    const weight = formData.get("weight");
    const suitableFor = formData.get("suitableFor");
    const smell = formData.get("smell");
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

    await ProductModel.create({
      name,
      price,
      quantity,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
      img: `http://localhost:3000/images/uploads/${filename}`,
    });


    return Response.json(
      { message: "Product created successfully :))", data: {} },
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
      { message: "Product has not image !!" },
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
  const products = await ProductModel.find({}, "-__v").populate("comments");
  return Response.json(products);
}


