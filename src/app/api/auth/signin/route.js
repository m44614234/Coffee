import {
  generateAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePassword,
  verifyPassword
} from "@/utils/auth";
import UserModel from "@/models/User";
import connectToDB from "@/configs/db";

export async function POST(req) {
 try {
  connectToDB();

    const body = await req.json();
    const { email, password } = body;
  
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);
  
    if (!isValidEmail || !isValidPassword) {
      return Response.json(
        { message: "email or password is  invalid" },
        { status: 419 }
      );
    }
  
    const user = await UserModel.findOne({ email });
  
    if (!user) {
      return Response.json({ message: "user Not Found" }, { status: 422 });
    }
  
    const isCorrectPassword = verifyPassword(password, user.password);
  
    if (!isCorrectPassword) {
      return Response.json(
        { message: "email or password is  not correct" },
        { status: 401 }
      );
    }
  
    const accessToken = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email });
  
  
    await UserModel.findOneAndUpdate({email} , {
      $set:{
          refreshToken
      }
    })
    
    return Response.json(
      { message: "User is Logged In Successfully!!" },
      {
        status: 200,
        headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true` }
      }
    );
 } catch (error) {

    return Response.json(
        { message: "error =>" , error },
        {
          status: 500
         }
      );
    
 }
}
