import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import { getCookies } from "next-client-cookies/server";
import { ZestAuth } from "zestauth3.1";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  {
    try {
      let data = await req.json();
      console.log(data);
      console.log(req.headers);
      let Provider = {
        EmailPassSignup: { ...data.Provider.EmailPassSignup, prisma },
      };
      console.log("HI");
      const result = await ZestAuth(Provider);
      console.log(result);
      return new NextResponse(JSON.stringify(result));
    } catch (e) {
      console.log(e);
      return new NextResponse(
        JSON.stringify({
          message: "Something went wrong in user backend",
          status: "failed",
        })
      );
    }
  }
}
