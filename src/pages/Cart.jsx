import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myBackend from "../backend/config";
import { CartCounter, LoadingScreen } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../store/orderSlice";
import { setCartCount } from "../store/cartSlice";

function Cart() {
  // States
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.cartCount);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Methods
  const loadCart = useCallback(async () => {
    setLoading(true);
    const data = await myBackend.getCart({ quantity_only: 0 });
    setCart(data || []);
    setLoading(false);
  }, []);

  const handleQuantityChange = async (id, quantity) => {
    if (loading) return;
    setLoading(true);
    const resp = await myBackend.updateCart({ product_id: id, quantity });
    if (resp) {
      console.log(resp.success);
    }
    setCart((prevCart) =>
      prevCart.map((product) => {
        return product.product.id === id ? { ...product, quantity } : product;
      })
    );
    setLoading(false);
  };

  const handleCheckout = () => {
    dispatch(setOrder({ products: cart, total }));
    navigate("/place-order");
  };
  const addDimensionsTransformationToUrl = (url, h, w) => {
    if (!url) return url;
    const splited = url.split("upload");

    return `${splited[0]}upload/w_${w},h_${h}${splited[1]}`;
  };

  // Hooks

  React.useEffect(() => {
    loadCart();
  }, []);

  // React.useEffect(() => {
  //   let total = 0;
  //   cart.forEach((item) => {
  //     total += item.product.price * item.quantity;
  //   });
  //   setTotal(total);
  // }, [cart]);

  const handleDelete = async (id) => {
    const resp = await myBackend.deleteCart(id);
    if (resp) {
      setCart((prev) => prev.filter((item) => item?.id !== id));
    }
    dispatch(setCartCount(cartCount?.cartCount - 1));
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <nav className="mx-auto w-full mt-4 max-w-[1200px] px-5">
        <ul className="flex items-center">
          <li className="cursor-pointer">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            </Link>
          </li>
          <li>
            <span className="mx-2 text-gray-500">&gt;</span>
          </li>

          <li className="text-gray-500">Cart</li>
        </ul>
      </nav>

      <section className="container mx-auto flex-grow max-w-[1200px] py-5 lg:flex lg:flex-row lg:justify-center lg:py-10">
        {/* Mobile View */}
        <>
          {cart.length ? (
            <>
              <section className="container mx-auto my-3 flex w-full flex-col gap-3 px-4 md:hidden">
                {cart.map((product) => (
                  <div
                    className="flex w-full border px-4 py-4"
                    key={product.product?.id}
                  >
                    <img
                      className=" object-contain"
                      width="90px"
                      height="90px"
                      src={addDimensionsTransformationToUrl(product?.product?.imgs[0],100,100)}
                      alt="img"
                    />
                    <div className="ml-3 flex w-full flex-col justify-center">
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold">
                          {product?.product?.title}
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                        </svg>
                      </div>
                      <p className="py-3 text-xl font-bold text-violet-900">
                        $
                        {(product?.product?.price * product?.quantity).toFixed(
                          2
                        )}
                      </p>
                      <div className="mt-2 flex w-full items-center justify-between">
                        <CartCounter
                          default_quantity={product?.quantity}
                          onQuantityChange={(changed_quantity) =>
                            handleQuantityChange(
                              product?.product?.id,
                              changed_quantity
                            )
                          }
                          max_val={product?.product?.stock}
                          disable={loading}
                        />
                        <button onClick={() => handleDelete(product?.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="m-0 h-5 w-5 cursor-pointer"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </section>

              <section className="hidden w-full max-w-[1200px] grid-cols-1 gap-3 px-5 pb-10 md:grid">
                <table className="table-fixed">
                  <thead className="h-16 bg-neutral-100">
                    <tr>
                      <th>ITEM</th>
                      <th>PRICE</th>
                      <th>QUANTITY</th>
                      <th>TOTAL</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {cart.map((product) => (
                      <tr className="border" key={product.product?.id}>
                        <td className="align-middle">
                          <Link to={`/product/${product?.product?.id}`}>
                            <div className="flex">
                              <img
                                className="w-[90px] h-[90px] object-contain"
                                src={addDimensionsTransformationToUrl(product?.product?.imgs[0],100,100)}
                                alt="img"
                              />
                              <div className="ml-3 flex flex-col justify-center">
                                <p className="text-xl font-bold hover:underline">
                                  {product.product?.title}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td className="mx-auto text-center">
                          &#36;{product.product?.price}
                        </td>
                        <td className="align-middle">
                          <CartCounter
                            default_quantity={product?.quantity}
                            onQuantityChange={(changed_quantity) =>
                              handleQuantityChange(
                                product.product?.id,
                                changed_quantity
                              )
                            }
                            max_val={product?.product?.stock}
                            disable={loading}
                          />
                        </td>
                        <td className="mx-auto text-center">
                          &#36;
                          {(product.product?.price * product?.quantity).toFixed(
                            2
                          )}
                        </td>
                        <td className="align-middle px-2">
                          <button onClick={() => handleDelete(product?.id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="m-0 h-5 w-5 cursor-pointer"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              <section className="mx-auto w-full px-4 md:max-w-[400px]">
                <div className="">
                  <div className="border py-5 px-4 shadow-md">
                    <p className="font-bold">ORDER SUMMARY</p>

                    <div className="flex justify-between border-b py-5">
                      <p>Subtotal</p>
                      <p>${total.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between border-b py-5">
                      <p>Shipping</p>
                      <p>Free</p>
                    </div>

                    <div className="flex justify-between py-5">
                      <p>Total</p>
                      <p>${total.toFixed(2)}</p>
                    </div>

                    <button
                      className="w-full bg-violet-900 px-5 py-2 text-white"
                      onClick={handleCheckout}
                    >
                      Proceed to checkout
                    </button>
                  </div>
                </div>
              </section>
            </>
          ) : loading ? (
            ""
          ) : (
            <div className="flex items-center flex-col justify-center gap-8">
              <span className="text-3xl font-bold">Your Cart is Empty</span>
              <img
                src="https://res.cloudinary.com/dmz847afv/image/upload/v1738739564/empty_cart_mqp0vx.jpg"
                alt=""
                className="w-24 h-24 mix-blend-multiply"
              />
              <button
                onClick={() => navigate("/catalog")}
                className="bg-amber-400 py-2 px-4"
              >
                Explore Products
              </button>
            </div>
          )}
        </>
      </section>
    </>
  );
}

export default React.memo(Cart);
