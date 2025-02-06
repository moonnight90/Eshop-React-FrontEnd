import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams,Link } from "react-router-dom";
import myBackend from "../backend/config";
import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "../components";


function OrderConfirm() {
  // States
  useDocumentTitle("Orders");
  const user = useSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const [wrongReq, setWrongReq] = useState(true);
  const [orderStatus, setOrderStatus] = useState("");
  const navigate = useNavigate();
  // Hooks
  useEffect(() => {
    const order_id = searchParams.get("order_id");
    const fetchOrder = async (order_id) => {
      const resp = await myBackend.getOrders(user.user_token, order_id);
      if (resp.status == 200) {
        const json_data = await resp.json();
        setOrderStatus(json_data.status);
        setWrongReq(false);
      } else {
        navigate("/cart");
      }
    };
    if (order_id) {
      fetchOrder(order_id);
    } else {
      navigate("/cart");
    }
  }, []);

  return (
    <>
      {wrongReq ? (
        <LoadingScreen />
      ) : (
        <div className="flex-grow">
          <section className="mt-20 px-4">
            <div className="flex flex-col">
              <p className="text-center text-3xl font-bold">
                {orderStatus == "Pending"
                  ? "We Accepted your order!"
                  : orderStatus == "Shipped"
                  ? "Order Shipped!"
                  : ""}
              </p>
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="mx-auto my-3 h-[60px] w-[60px] text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
                <p>
                  Thank you,{" "}
                  <span className="font-bold">
                    {user?.user.first_name} {user?.user.last_name}!
                  </span>
                </p>
                <p>You can check your order status on your orders list!</p>

                <div className="mt-10">
                  <Link
                    to="/order-history"
                    className="mx-auto bg-amber-400 px-4 py-2"
                  >
                    My Orders history
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default OrderConfirm;
