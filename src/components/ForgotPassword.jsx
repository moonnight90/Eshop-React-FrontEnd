import React, { useCallback, useState } from "react";
import { Input, SnackBar } from "./index";
import myBackend from "../backend/config";
import { useDispatch } from "react-redux";
import {
  setForgotPass,
  setOtpSent,
  setEmail as setStateEmail,
} from "../store/forgotPassSlice";

function ForgotPassword() {
  // States
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  // Methods
  const handleForgotPassword = async () => {
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
              className="mt-4 px-4 py-2 bg-amber-500 text-gray-800"
              onClick={handleForgotPassword}
            >
              Forgot Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
