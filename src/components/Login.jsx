import React from "react";
import { FoForgotPassword, Input } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/authSlice";
import backendAuth from "../backend/auth";
import { Link } from "react-router-dom";
import OtpInputField from "./OtpInputField";
import { setForgotPass } from "../store/forgotPassSlice";
function Login() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [loginLoading, setLoginLoading] = React.useState(false);
  const [loginError, setLoginErrors] = React.useState(false);

  const forgotPassState = useSelector((state) => state.forgotPass);

  /*

    Django Backend

  */

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
      console.log("Login Failed");
      dispatch(logout());
      setLoginErrors(resp.error);
    }
    setLoginLoading(false);
  };

  return (
    <>
      {forgotPassState?.forgotPass==true && <FoForgotPassword />}
      <section className="mx-auto flex-grow w-full mt-10 mb-10 max-w-[1200px] px-5">
        <div className="container mx-auto border px-5 py-5 shadow-sm md:w-1/2">
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
              <div className="flex items-center gap-2">
                <Input type="checkbox" {...register("rememberMe")} />
                <label htmlFor="checkbox">Remember me</label>
              </div>
              <button
                className="text-violet-900"
                onClick={() => dispatch(setForgotPass(true))}
              >
                Forgot password
              </button>
            </div>

            <button
              className={`my-5 w-full bg-violet-900 py-2 text-white ${
                loginLoading ? " bg-gray-300" : ""
              }`}
              type="submit"
              disabled={loginLoading}
            >
              LOGIN
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
