// import UserPass from "@/components/Creds/UserPass";
import EmailPass from "@/components/Creds/EmailPass";
// import EmailOtp from "@/components/Creds/EmailOtp";
// import OtpVerify from "@/components/Creds/OtpVerify";
import React from "react";

function AuthChoice() {
  return (
    <div>
      {/* <UserPass /> */}
      <EmailPass />
      {/* <EmailOtp /> */}
      {/* <OtpVerify /> */}
    </div>
  );
}

export default AuthChoice;
