import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { ZestAuth } from "zestauth3.1";
// import { parseCookies } from "cookies";
import { getCookie } from "cookies-next";

import { EmailPassSignup } from "zestauth3.1/Functions/EmailPassSignup";

export async function POST(req: NextRequest) {
  try {
    let data = await req.json();
    let Provider = {
      EmailPassSignin: { ...data.Provider.EmailPassSignin, prisma },
    };
    console.log("HI");
    const result = await ZestAuth(Provider);
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
