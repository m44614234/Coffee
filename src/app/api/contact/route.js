import connectToDB from "@/configs/db";
import ContactModel from "@/models/Contact"
export async function POST(req) {
  try {
    connectToDB();

    const body = await req.json();
    const { email, name, message, compony, phone } = body;

  const contact =  await ContactModel.create( { email, name, message, compony, phone })

    
    return Response.json(
      { message: "Contact Create Successfully :))", data: contact },
      {
        status: 201
      }
    );

  } catch (error) {
    return Response.json(
      { message: "Errpr :(", data: contact },
      {
        status: 500
      }
    );
  }
}
