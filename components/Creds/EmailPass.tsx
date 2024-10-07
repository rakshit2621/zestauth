"use client";
import React, { FormEvent } from "react";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
// import { MyContext } from "../layout";

function EmailPass() {
  // const { setEmail, setPassword } = useContext(MyContext);
  const router = useRouter();
  const cookies = useCookies();
  const [email, setEmailto] = useState("");
  const [password, setPasswordto] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const AuthPath = "api/signin/emailpass";

  const mycookies = document.cookie;
  const cookiePairs = mycookies.split(";");
  let cookieValuezest = "";

  for (let i = 0; i < cookiePairs.length; i++) {
    const pair = cookiePairs[i].trim();
    const parts = pair.split("=");

    if (parts[0] === "zestsignin") {
      cookieValuezest = parts[1];
      // console.log(cookieValuezest); // Output: Cookie value
      break;
    }
  }
  // console.log(cookieValuezest);
  useEffect(() => {
    async function calljwt() {
      if (cookieValuezest != "" && cookieValuezest != undefined)
        await jwtapi(cookieValuezest);
    }
    calljwt();
  }, []);
  async function jwtapi(cookieValuezest: any) {
    let Provider = {
      EmailPassSignup: {
        email,
        password,
        otpneeded: false,
        cookie: cookieValuezest,
      },
    };

    const response = await fetch(`${AuthPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Provider,
      }),
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    setIsLoading(false);
    if (data.status == "success") {
      cookies.set("zestsignin", data.newjwt);
      router.replace("/home");
    }
  }

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true);
    const Provider = { EmailPassSignup: { email, password, otpneeded: true } };

    try {
      const response = await fetch(`${AuthPath}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Provider,
        }),
      });
      const data = await response.json();
      console.log(data);
      setIsLoading(false);
      if (data.status == "success") {
        // setEmail(email);
        // setPassword(password);
        cookies.set("zestsignin", data.newjwt);
        router.replace("/home");
      }
    } catch (error) {
      console.error("Error:" + error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleClick}>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmailto(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPasswordto(e.target.value)}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}

export default EmailPass;
