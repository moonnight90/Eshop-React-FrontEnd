import React, { useEffect, useState } from "react";
import {
  AccountSideBar,
  NavigationBar,
  Input,
  LoadingScreen,
  LoadingAnimation
} from "../components";
import { login } from "../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import backendAuth from "../backend/auth";


function ProfileInformation() {
  // States
  const user = useSelector((auth) => auth.auth);
  const { register, handleSubmit, watch, reset } = useForm();
  const [srcImage, setSrcImage] = useState(false);
  const [updating, setUpdating] = useState(false);
  const dispatch = useDispatch();

  // Hooks

  useEffect(() => {
    watch((value, { name }) => {
      if (name == "file") {
        setSrcImage(URL.createObjectURL(value?.file?.[0]));
      }
    });
  }, [watch]);

  //Methods
  const onSubmit = async (data) => {
    setUpdating(true); // Disabling submit button with updating state
    const resp = await backendAuth.update_user(user.user_token, data);
    if (resp.status == 200) {
      const user_data = await resp.json();
      dispatch(
        // Updating the new values after update to the store
        login({
          token: user.user_token,
          user: user_data,
        })
      );
    } else {
      console.log(await resp.json());
    }
    setUpdating(false); // Back Enable
    reset();
  };
  return (
    <>
      {updating && <LoadingScreen />}
      <NavigationBar value={"Profile Information"} />
      <div className="container flex-grow mx-auto max-w-[1200px] border-b py-5 md:flex md:flex-row md:py-10">
        <AccountSideBar selected={1} />
        <section className="grid w-full max-w-[1200px] grid-cols-1 gap-3 px-5 pb-10">
          <div className="py-5">
            <div className="w-full">
              <h2>Avatar image</h2>
              <div className="mx-auto mb-5 flex flex-row items-center bg-neutral-100 py-5 lg:mx-0 lg:w-1/2">
                <form
                  className="flex w-full flex-col gap-3"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex items-center">
                    <img
                      className="h-20 w-20 rounded-full object-cover min-w-20 min-h-20"
                      src={
                        srcImage ||
                        `${user?.user?.image}`
                      }
                      alt={`profile image`}
                      
                    />
                    <label className="block">
                      <span className="sr-only">Choose profile photo</span>
                      <input
                        type="file"
                        className="mx-auto ml-5 flex w-full justify-center border-yellow-400 text-sm outline-none file:mr-4 file:bg-amber-400 file:py-2 file:px-4 file:text-sm file:font-semibold"
                        {...register("file")}
                        capture="user"
                      />
                    </label>
                  </div>
                  <div className="flex max-w-96 flex-col">
                    <Input
                      type="text"
                      label="First Name"
                      placeholder={user?.user?.first_name}
                      {...register("first_name")}
                    />
                  </div>

                  <div className="flex max-w-96 flex-col">
                    <Input
                      type="text"
                      label="Last Name"
                      placeholder={user?.user?.last_name}
                      {...register("last_name")}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="">Bio</label>
                    <textarea
                      className=" border px-4 max-w-96 py-2 text-gray-500 outline-none max-h-96"
                      name=""
                      id=""
                      cols="50"
                      rows="30"
                      placeholder={user?.user?.bio}
                      {...register("bio")}
                    ></textarea>

                    <button
                      className="mt-4 w-40 bg-violet-900 hover:bg-violet-800 px-4 py-2 text-white"
                      disabled={updating}
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ProfileInformation;
