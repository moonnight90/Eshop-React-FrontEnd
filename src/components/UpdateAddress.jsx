import React, { useState } from "react";
import { Input } from ".";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import myBackend from "../backend/config";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

function UpdateAddress({ setUpdatingAddress, data }) {
  // States
  const user = useSelector((auth) => auth.auth);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm(
    data != null
      ? {
          defaultValues: {
            fullName: data.fullName,
            address: data.address,
            city: data?.city,
            state: data?.state,
            zipcode: data?.zipcode,
            phone: data?.phone?.replace("+92", ""),
            default_address: data?.default_address,
          },
        }
      : {}
  );

  const handleDelete = async (id) => {
    const resp = await myBackend.addressBookDelete(user?.user_token, id, id);

    if (resp.status == 200) {
      console.log("Deleted");
      setUpdatingAddress(false);
    } else {
      console.log("Failed Deletion");
    }
  };

  // Methods
  const onSubmit = async (d) => {
    setLoading(true);
    if (d.phone) {
      d = { ...d, phone: `+92${d.phone}`, user: user?.user?.id };
    }
    if (data == null) {
      const resp = await myBackend.addressBookAdd(user.user_token, {
        ...d,
      });
      if (resp.status == 201) {
        console.log("Added New Address");
        setUpdatingAddress(false);
      }
    } else {
      const resp = await myBackend.addressBookUpdate(user.user_token, {
        ...d,
        id: data.id,
      });
      if (resp.status == 200) {
        console.log("Updated");

        setUpdatingAddress(false);
      } else if (resp.status == 400) {
        setLoading(false);
      }
    }
    setLoading(true);
  };

  return (
    <>
      {/* Confirming deletion */}
      {confirmDelete && (
        <div className="fixed flex items-center justify-center w-full h-full z-20 bg-black inset-0 bg-opacity-50 ">
          <div className=" bg-white p-3">
            <span className="text-lg">
              Are you sure you want to delete this address?
            </span>
            <hr />
            <div className="px-1 py-4">
              {data?.fullName && <p className="font-bold">{data.fullName}</p>}
              {data?.address && <p>{data.address}</p>}
              {data?.city && <p>{data.city}</p>}
              {data?.phone && <p className="font-medium">{data.phone}</p>}
            </div>
            <hr />
            <div className="flex justify-end gap-3 mt-3">
              <button
                className="bg-yellow-500 px-3 py-2 hover:bg-yellow-600 transition-colors duration-200"
                onClick={() => {
                  handleDelete(data?.id);
                }}
              >
                Confirm
              </button>
              <button
                className="bg-gray-300 px-3 py-2 hover:bg-gray-400 transition-colors duration-200"
                onClick={() => {
                  setConfirmDelete(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Main Popup */}
      <div className=" fixed h-screen inset-0 flex justify-center items-center z-10 bg-black bg-opacity-50 px-4">
        <div className="p-6 bg-gray-200 relative shadow-xl">
          <span
            className="absolute right-6 cursor-pointer text-2xl"
            onClick={() => setUpdatingAddress(false)}
          >
            <CancelIcon sx={{ color: red[900] }} />
          </span>

          <h1 className="text-2xl text-purple-950">
            {data == null ? "Add New Address" : "Update Address"}
          </h1>
          <form
            className="flex max-w-96 flex-col gap-3 mt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type="text"
              label="Full Name"
              {...register("fullName", { required: "Name is required." })}
            />
            <Input
              type="text"
              label="Address"
              {...register("address", { required: "Name is required." })}
            />

            <div className="flex gap-2">
              <Input
                type="text"
                label="City"
                {...register("city", { required: "Name is required." })}
              />
              <Input
                type="text"
                label="Zipcode"
                {...register("zipcode", { required: "Name is required." })}
              />
            </div>
            <Input
              type="text"
              label="State"
              {...register("state", { required: "Name is required." })}
            />

            <div>
              <label htmlFor="Phone">Phone</label>
              <div className="w-full p-2.5 text-sm  bg-gray-50 border-gray-300 border">
                <span className="text-gray-600">+92</span>
                <input
                  type="tel"
                  pattern="^(0)?3[0-9]{9}$"
                  maxLength={10}
                  placeholder="3xxxxxxxxx"
                  className=" text-gray-900 ml-1 bg-transparent outline-none"
                  {...register("phone", { required: "Name is required." })}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label>Default:</label>
              <input type="checkbox" {...register("default_address")} />
            </div>

            <div className=" mt-4 flex items-center justify-left gap-3">
              <button
                className="w-24 text-lg flex justify-center items-center gap-2  bg-yellow-400 h-9 text-purple-900 shadow-2xl active:shadow-none hover:bg-amber-400 transition-colors duration-200"
                disabled={loading}
              >
                <span className="text-inherit">Save</span>
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SaveIcon fontSize="inherit" color="inherit" />
                )}
              </button>
            </div>
          </form>
          {data != null && (
            <button
              className=" rounded-full w-8 h-8 flex justify-center items-center absolute bottom-6 left-36 text-lg outline-none text-purple-900 shadow-2xl shadow-purple-800 hover:bg-gray-300 transition-colors duration-200"
              onClick={() => setConfirmDelete(true)}
            >
              <DeleteIcon />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default UpdateAddress;
