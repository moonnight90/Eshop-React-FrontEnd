import React from "react";
function OrderOverview(orderData) {

  return (
    <>
      {/* Mobile product table   */}
      <section className="container mx-auto my-3 flex w-full flex-col gap-3 px-4 md:hidden">
        {orderData?.order_items.map((order) => (
          <div className="flex w-full border px-4 py-4" key={order.id}>
            <img
              className="self-start object-contain"
              width="90px"
              src={`${order?.product?.imgs?.[0]}`}
              alt="thumbnail"
            />
            <div className="ml-3 flex w-full flex-col justify-center">
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold">{order?.product?.title}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                </svg>
              </div>
              <p className="text-sm text-gray-400">
                Weight: {order?.product?.weight}
              </p>
              <p className="py-3 text-xl font-bold text-violet-900">
                ${order?.product?.price}
              </p>
              <div className="mt-2 flex w-full items-center justify-between">
                <div className="flex items-center justify-center">
                  <div className="flex cursor-text items-center justify-center active:ring-gray-500">
                    Quantity: {order?.quantity}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      {/* Mobile product table */}

      {/* Product table */}
      <section className="w-full max-w-[1200px] gap-3 px-5 pb-10">
        <table className="hidden w-full md:table">
          <thead className="h-16 bg-neutral-100">
            <tr>
              <th>ITEM</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {orderData?.order_items.map((order) => (
              <tr className="h-[100px] border-b" key={order?.id}>
                <td className="align-middle">
                  <div className="flex">
                    <img
                      className="w-[90px]"
                      src={`${order?.product?.imgs?.[0]}`}
                      alt="thumbnail"
                    />
                    <div className="ml-3 flex flex-col justify-center">
                      <p className="text-xl font-bold">{order?.product?.title}</p>
                      <p className="text-sm text-gray-400">Weight: {order?.product?.weight}</p>
                    </div>
                  </div>
                </td>
                <td className="mx-auto text-center">&#36;{order?.product?.price}</td>
                <td className="text-center align-middle">{order?.quantity}</td>
                <td className="mx-auto text-center">&#36;{order?.quantity*order?.product?.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Product table */}

        {/* Summary */}

        <section className="my-5 flex w-full flex-col gap-4 lg:flex-row">
          <div className="lg:w-1/2">
            <div className="border py-5 px-4 shadow-md">
              <p className="font-bold">ORDER SUMMARY</p>

              <div className="flex justify-between border-b py-5">
                <p>Subtotal</p>
                <p>${orderData?.order?.total.toFixed(2)}</p>
              </div>

              <div className="flex justify-between border-b py-5">
                <p>Shipping</p>
                <p>Free</p>
              </div>

              <div className="flex justify-between py-5">
                <p>Total</p>
                <p>${orderData?.order?.total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Address info */}

          <div className="lg:w-1/2">
            <div className="border py-5 px-4 shadow-md">
              <p className="font-bold">ORDER INFORMATION</p>

              <div>
                <p>Order#{orderData?.order?.id}</p>
              </div>

              <div className="flex flex-col border-b py-5">
                <p>
                  Status:
                  <span className={`font-bold
                    ${
                      orderData?.order?.status == "Pending"
                        ? "text-yellow-500"
                        : orderData?.order?.status == "Cancelled"
                        ? "text-red-500"
                        : orderData?.order?.status == "Delivered"
                        ? "text-green-500"
                        : orderData?.order?.status == "Shipped"
                        ? "text-blue-500"
                        : ""
                    }
                    `}>{orderData?.order?.status}</span>
                </p>

                <p>Date: 20/12/2023</p>
              </div>

              <div></div>

              <div className="flex flex-col border-b py-5">
                <p className="font-bold">ADDRESS INFORMATION</p>
                <p>State: {orderData?.order?.address?.state}</p>
                <p>City: {orderData?.order?.address?.city}</p>
                <p>Zip-Code: {orderData?.order?.address?.zipcode}</p>
                <p>Delivery: {orderData?.order?.payment}</p>
              </div>

              <div className="flex flex-col py-5">
                <p className="font-bold">PAYMENT INFORMATION</p>
                <p>Payment method: {orderData?.order?.payment}</p>
              </div>
            </div>
          </div>

          {/* Address info */}
        </section>
      </section>
    </>
  );
}

export default OrderOverview;
