import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, Input, OtpVerifier } from "./";
import backendAuth from "../backend/auth";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import myBackend from "../backend/config";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function Signup() {
  // Using React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // States
  const [passMatch, setPassMatch] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [signupData, setSignupData] = useState({});
  const [otpVerfied, setOtpVerfied] = useState(false);
  const [retires, setRetires] = useState(4);
  const [isSignUpPressed,setIsSignUpPressed] = useState(false);
  const dispatch = useDispatch();

  // UseEffect
  useEffect(() => {
    watch((value, { name }) => {
      if (name === "confirmPassword" || name === "password")
        if (
          value["confirmPassword"] !== value["password"] &&
          value["confirmPassword"] !== ""
        )
          setPassMatch(true);
        else setPassMatch(false);
    });
  }, [watch]);

  // Methods
  const onSubmit = async (data) => {
    setIsSignUpPressed(true);
    setSignupData(data);
    const otp_sent_resp = await myBackend.sentOTP({
      email: data.email,
      name: `${data.first_name} ${data.last_name}`,
    });

    if (otp_sent_resp.ok) {
      setShowOtp(true);
      console.log("is working");
    }
    console.log(showOtp);
  };

  const confirmOTP = async (otp) => {
    otp = otp.join('')
    const resp = await myBackend.verifyOTP({
      email: signupData.email,
      otp,
    });
    if (resp.ok) {
      setShowOtp(false);
      setOtpVerfied(true);
      backendSignup(signupData);
    } else {
      console.log("Wrong OTP",retires);
      setOtpVerfied(false);
      setRetires((prev)=>prev-1)
      if(retires<=0)
        location.reload();
        

    }
  };

  const backendSignup = async (data) => {
    const resp = await backendAuth.signup({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
    });
    if (resp.ok) {
      const json_resp = await resp.json();
      console.log(json_resp); // Loging the response
      if (json_resp?.Token) {
        const user_data = await backendAuth.me(json_resp.Token);
        dispatch(
          login({
            token: json_resp.Token,
            user: await user_data.json(),
          })
        );
      }
    } else {
      const resp_data = await resp.json();
      respErrors(resp_data.error);
    }
  };

  return (
    <section className="mx-auto mt-10 w-full flex-grow mb-10 max-w-[1200px] px-5">
      <div className="container max-w-[450px] mx-auto border px-5 py-5 shadow-sm md:w-1/2">
        <div className="">
          <p className="text-4xl font-bold">CREATE AN ACCOUNT</p>
          <p>Register for new customer</p>
        </div>

        <form className="mt-6 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 mt-3 border px-4 py-2 flex flex-row justify-between gap-2">
            <Input
              type="text"
              label="First Name:"
              className="w-1/2"
              inputClassName={errors?.first_name && "border-2 border-red-700"}
              {...register("first_name", {
                required: "First Name is required",
              })}
            />

            <Input
              type="text"
              label="Last Name:"
              className="w-1/2"
              {...register("last_name")}
            />
          </div>

          {errors?.first_name && (
            <span className=" text-sm text-red-700">
              {errors?.first_name.message}
            </span>
          )}

          <Input
            type="text"
            label="Email Address:"
            className={`mt-3 mb-3 border px-4 py-2 `}
            inputClassName={errors?.email && "border-2 border-red-700"}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors?.email && (
            <span className=" text-sm text-red-700">
              {errors?.email.message}
            </span>
          )}
          <Input
            type="password"
            label="Password:"
            className="mt-3 border px-4 py-2"
            inputClassName={errors?.password && "border-2 border-red-700"}
            {...register("password", { required: "Password is required" })}
          />

          {errors?.password && (
            <span className=" text-sm text-red-700">
              {errors?.password.message}
            </span>
          )}

          <Input
            type="password"
            label="Confirm password:"
            className="mt-3 border px-4 py-2"
            {...register("confirmPassword")}
          />

          {passMatch && (
            <span className=" text-sm text-red-700">
              Password doesn't match ...
            </span>
          )}

          <Button
            className={`my-5 w-full rounded-none mt-3 py-2 text-white flex justify-center items-center gap-2  ${
              passMatch || isSignUpPressed ? "bg-gray-500 " : "bg-violet-900 hover:bg-violet-950"
            }`}
            disabled={passMatch || isSignUpPressed}
          >
            CREATE ACCOUNT
            {isSignUpPressed&&<CircularProgress size={20} color="inherit" />}
          </Button>
        </form>

        {/* <p className="text-center text-gray-500">OR SIGN UP WITH</p>

        <div className="my-5 flex gap-2">
          <button className="w-1/2 bg-blue-800 py-2 text-white">
            FACEBOOK
          </button>
          <button className="w-1/2 bg-orange-500 py-2 text-white">
            GOOGLE
          </button>
        </div> */}

        <p className="text-center">
          Already have an account?
          <Link to="/login" className="text-violet-900">
            Login now
          </Link>
        </p>
        <div>
          <OtpVerifier
            handleClose={() => {
              setShowOtp(false);
            }}
            isOpen={showOtp}
            confirmOTP = {confirmOTP}
            retires = {retires}
          />
        </div>
      </div>
    </section>
  );
}

export default Signup;
