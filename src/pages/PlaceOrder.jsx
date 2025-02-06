import React, { useState, useEffect, useCallback } from "react";
import { useSelector,useDispatch } from "react-redux";
import myBackend from "../backend/config";
import { useNavigate } from "react-router-dom";
import { resetState } from "../store/cartSlice";
import { CircularProgress } from "@mui/material";
import useDocumentTitle from "../CustomHook/useDocumentTitle";

function PlaceOrder() {
  // States
  useDocumentTitle("Place Order");
  const orders = useSelector((state) => state.order);
  const user = useSelector((state) => state.auth);
  const [address, setAddress] = useState([]);
  const [seletedAddress, setSeletedAddress] = useState(null);
  const [updatingAddress, setUpdatingAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Hooks

  useEffect(() => {
    if (!orders?.pendingCheckout) navigate("/cart");
  }, []);

  // Methods
  const getDefaultAddress = useCallback((address) => {
    return address.find((v) => v.default_address);
  });

  const handleConfirmOrder = async () => {
    setLoading(true);
    if (seletedAddress == null) {
      alert("Please Select an Address!");

      return null;
    }
    const resp = await myBackend.placeOrder(user?.user_token, {
      address_id: seletedAddress?.id,
      total: orders?.total,
      order_items: orders.products.map((product) => {
        return {
          product_id: product.product.id,
          item_id: product.id,
          quantity: product.quantity,
        };
      }),
    });

    if (resp.status == 201) {
      // Navigate to Order Confirmed Page
      const json_resp = await resp.json();
      navigate(`/order-confirm/?order_id=${json_resp.id}`);
    } else if (resp.status == 500) {
      console.log("Something went wrong");
    } else {
      console.log(await resp.json());
    }
    setLoading(false);
    dispatch(resetState());
  };
  const addDimensionsTransformationToUrl = (url, h, w) => {
    if (!url) return url;
    const splited = url.split("upload");

    return `${splited[0]}upload/w_${w},h_${h}${splited[1]}`;
  };

  // Hooks
  useEffect(() => {
    const fetchAddress = async () => {
      const addresses = await myBackend.addressbook(user?.user_token);
      if (addresses.length) {
        setSeletedAddress(getDefaultAddress(addresses));
        setAddress(addresses);
      }
    };
    fetchAddress();
  }, []);

  return (
    <>
      <div
        className={`${
          updatingAddress ? "fixed" : "hidden"
        } inset-0 bg-black bg-opacity-30`}
      >
        <div className="w-[300px] fixed top-0 right-0 h-screen bg-gray-100 shadow-lg p-4">
          <h1 className="text-xl font-bold">Shipping & Billing</h1>
          {address.map((add) => (
            <div
              className="border mt-2 border-gray p-3 cursor-pointer hover:shadow"
              key={add.id}
              onClick={() => {
                setSeletedAddress(add);
                setUpdatingAddress(false);
              }}
            >
              <p>
                <span className="mr-2">{add.fullName}</span>
                <span>{add.phone}</span>
              </p>
              <p>
                <span>{add.address}</span>
              </p>

              <p>
                <span className="mr-2">{add.state}</span>
                <span>{add.zipcode}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="container max-w-[1200px] m-auto flex flex-col md:flex-row">
        <div className="min-w-3/4 md:w-3/4">
          {/* Selecting Shipping Address */}
          <div className="border py-5 px-4 shadow-md">
            <div className="flex justify-between">
              <p className="font-bold">Shipping & Billing</p>
              <button
                className="text-blue-800 underline"
                onClick={() => setUpdatingAddress(true)}
              >
                Edit
              </button>
            </div>
            <div className="flex gap-6 py-5">
              <p>{seletedAddress?.fullName}</p> <p>{seletedAddress?.phone}</p>
            </div>
            <p>
              <span className="bg-green-800 text-white px-2 py-1 mr-2">
                Address:
              </span>
              {seletedAddress?.address}
            </p>
          </div>

          {/* Selecting Payment Method */}
          <div className="border py-5 px-4 shadow-md mt-5">
            <p className="font-bold">PAYMENT METHOD</p>
            <div className="flex justify-between py-5">
              <p>Cash on Delivery (COD)</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="border py-5 px-4 shadow-md mt-5">
            <p className="font-bold py-3">ORDER ITEMS</p>
            {orders.products.map((order) => (
              <div
                className="flex items-center gap-5 border p-2 mt-2"
                key={order.id}
              >
                <img
                  src={addDimensionsTransformationToUrl(order.product.imgs[0],500,500)}
                  className="h-24 w-24 object-contain border"

                />
                <div className="w-2/3">
                  <p>{order.product.title}</p>
                  <strong>$ {order.product.price}</strong>
                </div>
                <span>Qty: {order.quantity}</span>
              </div>
            ))}
          </div>
        </div>
        <section className="mt-5 min-w-[300px] px-4 md:max-w-[400px]">
          <div className="">
            <div className="border py-5 px-4 shadow-md">
              <p className="font-bold">ORDER SUMMARY</p>

              <div className="flex justify-between border-b py-5">
                <p>Subtotal</p>
                <p>${orders?.total.toFixed(2)}</p>
              </div>

              <div className="flex justify-between border-b py-5">
                <p>Shipping</p>
                <p>Free</p>
              </div>

              <div className="flex justify-between py-5">
                <p>Total</p>
                <p>${orders?.total.toFixed(2)}</p>
              </div>

              <button
                className="w-full flex gap-2 justify-center items-center bg-violet-900 px-5 py-2 text-white"
                onClick={handleConfirmOrder}
                disabled={loading}
              >
                Confirm Order
                {loading&&<CircularProgress size={20} color="inherit" />}
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default PlaceOrder;
