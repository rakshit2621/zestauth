import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import { getCookies } from "next-client-cookies/server";
import jwt from "jsonwebtoken";
import { userpasszod } from "@/app/api/_zod/zoddy";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
import { ZestAuth } from "zestauth3.1";

export async function POST(req: NextRequest) {
  {
    try {
      let data = await req.json();
      // const headers: any = req.headers;
      // console.log(headers);
      // const cookie = headers.Cookie;
      // console.log(cookie);
      let Provider = {
        UserPassSignup: { ...data.Provider.UserPassSignup, prisma },
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
