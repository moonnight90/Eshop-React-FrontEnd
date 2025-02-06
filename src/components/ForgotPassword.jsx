import React, { useState } from "react";
import { Input, SnackBar } from "./index";
import myBackend from "../backend/config";
import { useDispatch } from "react-redux";
import {
  setForgotPass,
  setOtpSent,
  setEmail as setStateEmail,
} from "../store/forgotPassSlice";
import { CircularProgress } from "@mui/material";

function ForgotPassword() {
  // States
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Methods
  const handleForgotPassword = async () => {
    setLoading(true);
    const resp = await myBackend.reset_password(email);
    if (resp.status === 202) {
      dispatch(setOtpSent(true));
      dispatch(setStateEmail(email));
      setMessage("OTP sent ...");
    } else if (resp.status === 404 || resp.status === 422) {
      const json_resp = await resp.json();
      setMessage(`${json_resp?.msg} ...`);
    } else {
      setMessage("Unexpected error occur ...");
    }

    setShowMessage(true);
    setLoading(false);
  };
  

  return (
    <>
      {/* snack-bar to show messages */}
      <SnackBar
        showMessage={showMessage}
        setShowMessage={setShowMessage}
        message={message}
      />

      <div
        onClick={() => dispatch(setForgotPass(false))}
        className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50 p-5"
        scroll="no"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-200 p-5 flex flex-col gap-5"
        >
          <h1 className="text-2xl text-violet-900">Forgot Password</h1>
          <div className="w-80">
            <Input
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <button
              className={`my-5 w-full py-2 cursor-pointer text-white flex justify-center items-center gap-2 ${
                loading ? " bg-gray-500" : "bg-violet-900"
              }`}
              onClick={handleForgotPassword}
              disabled={loading}
            >
              
              Forgot Password
              {loading && <CircularProgress size={20} color="inherit" />}
            </button>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
