import React from "react";
import { FoForgotPassword, Input, SnackBar } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/authSlice";
import backendAuth from "../backend/auth";
import { Link } from "react-router-dom";
import OtpInputField from "./OtpInputField";
import { setForgotPass, reset } from "../store/forgotPassSlice";
import { useState } from "react";
import myBackend from "../backend/config";
import { CircularProgress } from "@mui/material";
function Login() {
  // States
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginErrors] = useState(false);
  const [otpL, setOtpL] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  

  // Redux
  const forgotPassState = useSelector((state) => state.forgotPass);

  // Methods
  const backendLogin = async (data) => {
    setLoginLoading(!loginLoading);
    const resp = await backendAuth.login(data);
    if (resp?.token) {
      const user_data = await backendAuth.me(resp.token);
      const user_json_data = await user_data.json();
      dispatch(
        login({
          token: resp.token,
          user: user_json_data,
        })
      );
    } else {
      setMessage(`${resp.error} ...`);
      setShowMessage(true);
      dispatch(logout());
      setLoginErrors(resp.error);
    }
    setLoginLoading(false);
  };

  const submitNewPassword = async () => {
    setLoading(true);
    const resp = await myBackend.confirm_reset_password(
      forgotPassState?.email,
      otpL.join(""),
      newPassword
    );
    if (resp.status === 200) {
      setMessage("Password updated ...");
      dispatch(reset());
      setNewPassword('');
      setOtpL([]);
    } else if (resp.status == 400) {
      const json_resp = await resp.json();
      setMessage(`${json_resp?.msg} ...`);
    } else {
      setMessage("Unexpected Error occur ...");
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

      {/* new password submit when otp sent */}
      {forgotPassState?.otp_sent == true && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50 p-5"
          onClick={() => dispatch(reset())}
        >
          <div className=" p-5 bg-white" onClick={(e) => e.stopPropagation()}>
            <h1 className="text-2xl text-violet-900">OTP</h1>
            <OtpInputField otp={otpL} setOtp={setOtpL} className="mt-4" />
            <Input
              className="mt-4"
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            <button
              className={`mt-5 w-full py-2 cursor-pointer text-white flex justify-center items-center gap-2 ${
                loading ? " bg-gray-500" : "bg-violet-900"
              }`}
              onClick={submitNewPassword}
            >
              Submit
              {loading && <CircularProgress size={20} color="inherit" />}
            </button>
          </div>
        </div>
      )}

      {/* will show only when forgot message btn clicked */}
      {forgotPassState?.forgotPass == true && !forgotPassState?.otp_sent && (
        <FoForgotPassword />
      )}

      {/* main container of login page */}
      <section className="mx-auto flex-grow w-full mt-10 mb-10 max-w-[1200px] px-5">
        <div className="container max-w-[450px] mx-auto border px-5 py-5 shadow-sm md:w-1/2">
          <div className="">
            <p className="text-4xl font-bold">LOGIN</p>
            <p className="text-purple-950">Welcome back, customer!</p>
          </div>

          <form
            className="mt-6 flex flex-col"
            onSubmit={handleSubmit(backendLogin)}
          >
            {loginError && <p className="text-red-500">{loginError}</p>}
            <Input
              type="email"
              label="Email"
              className="mb-3 mt-3 border px-4 py-2"
              {...register("email", { required: true })}
            />

            <Input
              type="password"
              label="Password"
              className="mt-3 border px-4 py-2"
              {...register("password")}
            />

            <div className="mt-4 flex items-center justify-between ">
              {/* <div className="flex items-center gap-2">
                <Input type="checkbox" {...register("rememberMe")} />
                <label htmlFor="checkbox">Remember me</label>
              </div> */}
              <button
              type="button"
                className="text-violet-900"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setForgotPass(true));
                }}
              >
                Forgot password?
              </button>
            </div>

            <button
              className={`my-5 w-full py-2 cursor-pointer text-white flex justify-center items-center gap-2 ${
                loginLoading ? " bg-gray-500" : "bg-violet-900"
              }`}
              type="submit"

              disabled={loginLoading}
            >Login
            {loginLoading&&<CircularProgress size={20} color="inherit" />}
            </button>
             
          </form>

          <p className="text-center">
            Don`t have account?
            <Link to="/signup" className="text-violet-900">
              Register now
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Login;
