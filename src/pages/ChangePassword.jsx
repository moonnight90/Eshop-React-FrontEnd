import React, { useEffect, useState } from "react";
import { AccountSideBar, NavigationBar, Input, SnackBar } from "../components";
import { useForm } from "react-hook-form";
import { useSelector,useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import backendAuth from "../backend/auth";
import CircularProgress from "@mui/material/CircularProgress";

function ChangePassword() {
  // States
  const [passMatch, setPassMatch] = useState(false);
  const user = useSelector((auth) => auth.auth);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Hooks
  const { register, handleSubmit, watch, reset } = useForm();

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
    setLoading(true);
    const resp = await backendAuth.update_password(
      user.user_token,
      data?.["currentPassword"],
      data?.["password"]
    );
    if (resp.status == 200) {

      const login_resp = await  backendAuth.login({
        email: user?.user?.email,
        password: data?.['password']
      })

      const user_data = (await backendAuth.me(login_resp?.token));
      const user_json_data = await user_data.json();
      dispatch(login({...login_resp,user:user_json_data}))

      setMessage("Password Changed");
      setShowMessage(true);

    } else if (resp.status == 400) {
      const json_resp = await resp.json();
      if (json_resp.current_password) {
        setMessage("Incorrect Current Password");
        setShowMessage(true);
      }
    }
    reset();
    setLoading(false);
  };

  return (
    <>
      <SnackBar
        showMessage={showMessage}
        setShowMessage={setShowMessage}
        message={message}
      />
      <NavigationBar value={"Change Password"} />
      <div className="container flex-grow mx-auto max-w-[1200px] border-b py-5 md:flex md:flex-row md:py-10">
        <AccountSideBar selected={3} />
        <section className="w-full max-w-[1200px] gap-3 px-5 pb-10 mt-5">
          <div className="py-5">
            <form
              className="flex max-w-96 flex-col gap-3 min-w-60"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex w-full flex-col">
                <Input
                  type="password"
                  label="Current password"
                  {...register("currentPassword", {
                    required: "Current Passoword is requried.",
                  })}
                />
              </div>

              <div className="flex w-full flex-col">
                <Input
                  type="password"
                  label="New Password"
                  {...register("password", {
                    required: "New Passoword is requried.",
                  })}
                />
              </div>

              <div className="flex flex-col">
                <Input
                  type="password"
                  label="Confirm New Password"
                  {...register("confirmPassword", {
                    required: "New Passoword is requried.",
                  })}
                />
                {passMatch && (
                  <span className=" text-sm text-red-700">
                    Password doesn't match ...
                  </span>
                )}
              </div>

              <button
                className="w-24 text-lg flex justify-center items-center gap-2  bg-yellow-400 h-9 text-purple-900 shadow-2xl active:shadow-none hover:bg-amber-400 transition-colors duration-200"
                disabled={(loading||passMatch)}
              >
                
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ):<span className="text-inherit">Save</span>}
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default ChangePassword;
