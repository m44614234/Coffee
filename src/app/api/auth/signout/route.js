import { cookies } from "next/headers";

export async function POST(req) {
  cookies().delete("token");
  return Response.json({ message: "Logout Successfully" });
}
