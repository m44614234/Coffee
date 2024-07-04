import connectToDB from "@/configs/db";
import CheckOutModel from "@/models/CheckoutUser";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();

    const {
      name,
      family,
      completed,
      email,
      mobile,
      address,
      province,
      city,
      details,
      postalCode,
      user,
      finalPrice ,
      order
    } = body;

    console.log("body =>" , body)

    if (!name || !family || !email || !mobile || !address || !postalCode) {
      return Response.json(
        { message: "all fields are required" },
        { status: 422 }
      );
    }

    if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)){
        return Response.json({message : "email is not valid"} , {status : 422})
    }




    
      await CheckOutModel.create({
        name ,
        family ,
        completed ,
        email ,
        mobile ,
        address ,
        province ,
        city ,
        details ,
        postalCode ,
        user,
        finalPrice ,
        order
    });
    

   

    return Response.json(
      { message: "Checkout Create Successfully :))" },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("error =>", error);

    return Response.json(
      { message: "Error =>", error },
      {
        status: 500,
      }
    );
  }
}

export async function GET(){
const checkout = await CheckOutModel.find({}).populate("products")
return Response.json(checkout)
}
