import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { ZestAuth } from "zestauth3.1";

export async function POST(req: NextRequest) {
  try {
    let data = await req.json();
    // let headers: any = req.headers;
    // console.log(headers);
    // const mycookiee = headers.get("cookie");
    // const cookieParts = mycookiee.split("=");
    // const cookieValue = cookieParts[1];
    // console.log(cookieValue);
    // headers.cookie = cookieValue;
    // console.log(headers);
    let Provider = {
      UserPassSignin: {
        ...data.Provider.UserPassSignin,
        prisma,
        // cookie: cookieValue,
      },
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
