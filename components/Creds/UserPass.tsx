"use client";
import React, { FormEvent } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

function UserPass() {
  const router = useRouter();
  const cookies = useCookies();
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const AuthPath = "api/signin/userpass";

  const mycookies = document.cookie;
  const cookiePairs = mycookies.split(";");
  let cookieValuezest = "";

  for (let i = 0; i < cookiePairs.length; i++) {
    const pair = cookiePairs[i].trim();
    const parts = pair.split("=");

    if (parts[0] === "zestsignin") {
      cookieValuezest = parts[1];
      console.log(cookieValuezest); // Output: Cookie value
      break;
    }
  }
  console.log(cookieValuezest);
  useEffect(() => {
    async function calljwt() {
      if (cookieValuezest != "" && cookieValuezest != undefined)
        await jwtapi(cookieValuezest);
    }
    calljwt();
  }, []);
  async function jwtapi(cookieValuezest: any) {
    let Provider = {
      UserPassSignin: { username, password, cookie: cookieValuezest },
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
    const Provider = { UserPassSignin: { username, password } };

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
      console.log(response);
      const data = await response.json();
      console.log(data);
      setIsLoading(false);
      if (data.status == "success") {
        cookies.set("zestsignin", data.newjwt);
        router.replace("/home");
      }
    } catch (error) {
      console.log("Error:" + error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleClick}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}

export default UserPass;
