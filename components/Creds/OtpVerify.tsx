"use client";
import React, { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
// import {email,password} from

function OtpVerify() {
  const router = useRouter();
  const cookies = useCookies();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const AuthPath = "api/signup/otpverify";

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true);
    const Provider = { OtpVerify: { email, otp } };
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
      cookies.set("zestsignin", data.newjwt);
      setIsLoading(false);
      if (data.status == "success") {
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
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="otp"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}

export default OtpVerify;
