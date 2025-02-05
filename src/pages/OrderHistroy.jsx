import React, { useCallback, useEffect, useState } from "react";
import myBackend from "../backend/config";
import { useSelector } from "react-redux";
import {
  AccountSideBar,
  LoadingScreen,
  NavigationBar,
  OrderOverview,
} from "../components";
import { useSearchParams } from "react-router-dom";
function OrderHistroy() {
  // States
  const user = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useSearchParams();
  const [orderData, setOrderData] = useState(null);

  // Methods

  const dateFormat = useCallback((dateStr) => {
    const orderDate = new Date(dateStr);
    let day = orderDate.getDate().toString().padStart(2, "0");
    let month = (orderDate.getMonth() + 1).toString().padStart(2, "0");
    let year = orderDate.getFullYear();
    return `${day}/${month}/${year}`;
  }, []);

  // Hooks
  useEffect(() => {
    const getOrders = async () => {
      const resp = await myBackend.getOrders(user.user_token, null);
      if (resp.status == 200) {
        setOrders(await resp.json());
      }
    };
    getOrders();
    setLoading(false);
  }, []);

  useEffect(() => {
    const id = params.get("id");
    const getOrderDetail = async (id) => {
      const resp = await myBackend.getOrder(user.user_token, id);
      if (resp.status === 200) {
        setOrderData({
          order_items: await resp.json(),
          order: orders.find((order) => order?.id == id),
        });
      } else return false;
    };
    if (id && orders.length) {
      getOrderDetail(id);
    } else setOrderData(null);
  }, [params, orders]);

  return (
    <>
      {loading && <LoadingScreen />}
      <NavigationBar value={"Order History"} />
      <div className="container flex-grow mx-auto max-w-[1200px] border-b py-5 md:flex md:flex-row md:py-10">
        <AccountSideBar selected={4} />
        {orderData != null ? (
          <OrderOverview {...orderData} />
        ) : (
          <section className="grid w-full max-w-[1200px] grid-cols-1 gap-3 px-5 pb-10">
            <section className="container mx-auto my-3 flex w-full flex-col gap-3 px-4 md:hidden">
              {orders.map((order) => (
                <div className="flex w-full border px-4 py-4" key={order?.id}>
                  <div className="ml-3 flex w-full flex-col justify-center">
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold">
                        Order &#8470; {order?.id}
                      </p>
                      <div
                        className={`border px-2 py-1 ${
                          order?.status == "Pending"
                            ? "text-yellow-500 border-yellow-500"
                            : order?.status == "Cancelled"
                            ? "text-red-500 border-red-500"
                            : order?.status == "Delivered"
                            ? "text-green-500 border-green-500"
                            : order?.status == "Shipped"
                            ? "text-blue-500 border-blue-500"
                            : ""
                        }`}
                      >
                        {order?.status}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">
                      {dateFormat(order?.created_at)}
                    </p>
                    <p className="py-3 text-xl font-bold text-violet-900">
                      &#36;{order?.total?.toFixed(2)}
                    </p>
                    <div className="mt-2 flex w-full items-center justify-between">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => setParams({ id: order?.id })}
                          className="flex items-center justify-center bg-amber-500 px-2 py-2 active:ring-gray-500"
                        >
                          View order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {
                orders.length==0&&<div className="text-center">Didn't order yet!</div>
              }
            </section>
            {/* Mobile order table  */}

            {/* Order table  */}
            <section className="hidden w-full max-w-[1200px] grid-cols-1 gap-3 px-5 pb-10 md:block">
              <table className="w-full table-auto">
                <thead className="h-16 border">
                  <tr>
                    <th>ORDER</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr className="border h-16 " key={order?.id}>
                      <td className="text-center align-middle">
                        &#8470; {order?.id}
                      </td>
                      <td className="mx-auto text-center">
                        {dateFormat(order?.created_at)}
                      </td>
                      <td className="text-center align-middle">
                        &#36;{order?.total?.toFixed(2)}
                      </td>

                      <td className="mx-auto text-center">
                        <span
                          className={`
                      border-2 py-1 px-3 ${
                        order?.status == "Pending"
                          ? "text-yellow-500 border-yellow-500"
                          : order?.status == "Cancelled"
                          ? "text-red-500 border-red-500"
                          : order?.status == "Delivered"
                          ? "text-green-500 border-green-500"
                          : order?.status == "Shipped"
                          ? "text-blue-500 border-blue-500"
                          : ""
                      }`}
                        >
                          {order?.status}
                        </span>
                      </td>
                      <td className="text-center align-middle">
                        <button
                          className="text-center bg-amber-400 px-4 py-2"
                          onClick={() => setParams({ id: order?.id })}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            {/* Order table */}
          </section>
        )}
      </div>
    </>
  );
}

export default OrderHistroy;
