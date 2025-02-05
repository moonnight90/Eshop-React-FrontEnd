import React, { useState } from "react";
import { OtpInputField } from "./";
const OtpVerifier = ({ handleClose, isOpen, confirmOTP, retires }) => {
  if (!isOpen) return null;
  const [otp, setOtp] = useState(Array(6).fill(""));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
      <div className="bg-white p-6 shadow-lg max-w-sm w-full flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Confirm OTP</h2>
        <p className="">Please enter the OTP sent to your email.</p>
        
        <OtpInputField length={6} otp={otp} setOtp={setOtp} />
        <div className="flex justify-between">
          <button
            onClick={handleClose}
            className=" border-2 font-bold border-red-500 text-red-500 px-4 py-2  hover:bg-red-100"
          >
            Cancel
          </button>
          {retires<=3?<span className="text-red-500 text-sm m-auto">{retires} retires left</span>:<></>}
          <button
            className="bg-violet-800 text-white px-4 py-2 hover:bg-violet-900"
            onClick={() => {
              confirmOTP(otp);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerifier;
