import React, { useCallback, useEffect, useState } from "react";
import { AccountSideBar, NavigationBar, SnackBar } from "../components";
import myBackend from "../backend/config";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import conf from "../config/conf";
import { setCartCount } from "../store/cartSlice";

function Wishlist() {
  // States
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();
  //   const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [showMessage, setShowMessage] = useState(null);
  const dispatch = useDispatch();


  //methods
  const addCartHandle = useCallback(async (id) => {
    const resp = await myBackend.addToCart({
      product_id: id,
      quantity: 1,
    });

    if (resp?.status == 200) {
      setSnackBarMessage(resp?.success);
      setShowMessage(true);
    } else {
      setSnackBarMessage(resp?.error);
      setShowMessage(true);
    }

    async function chnageCartQuantity() {
      const resp = await myBackend.getCart({ quantity_only: 1 });
      if (resp) {
        dispatch(setCartCount(resp?.total_quantity));
      }
    }
    chnageCartQuantity();
  });

  const handleDeleteItem = useCallback(async (id) => {
    const resp = await myBackend.deleteWishlistItem(user.user_token, id);
    if (resp.status == 200) {
      setSnackBarMessage("Deleted Successfully ...");
      setShowMessage(true);
      setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    } else if (resp.status == 404) {
      setSnackBarMessage("Product now does't exists ...");
      setShowMessage(true);
    } else {
      setSnackBarMessage("Something Unexpected occur ...");
      setShowMessage(true);
    }
  });

  //hooks
  useEffect(() => {
    const getItems = async () => {
      const resp = await myBackend.getWishlistItems(user?.user_token);
      if (resp.status === 200) {
        setWishlistItems(await resp.json());
      }
    };
    getItems();
  }, []);

  return (
    <>
      <SnackBar
        showMessage={showMessage}
        setShowMessage={setShowMessage}
        message={snackBarMessage}
      />
      <NavigationBar value={"Wishlist"} />
      <div className="container flex-grow mx-auto min-h-96 max-w-[1200px] py-5 md:flex md:flex-row md:py-10 relative">
        <AccountSideBar selected={5} />
        {wishlistItems.length > 0 ? (
          <>
            {/* mobile */}
            <section className="mx-auto container grid grid-cols-1 sm2:grid-cols-2 gap-5 px-5 pb-10 md:hidden">
              {wishlistItems.map((item) => (
                <div className="flex flex-col border p-2" key={item.id}>
                  <div className="relative flex justify-center">
                    <img
                      className="object-contain w-full aspect-square"
                      src={`${conf.BACKEND_DOMAIN}${item?.product?.imgs?.[0]}`}
                      alt="Image"
                    />
                    <div className="absolute flex h-full w-full items-center justify-center gap-3 opacity-0 duration-150 hover:opacity-100">
                      <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-amber-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                          />
                        </svg>
                      </span>
                      <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-amber-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4"
                        >
                          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div>
                    <Link to={`/product/${item?.product?.id}`}>
                      <p className="mt-2">{item?.product?.title}</p>
                    </Link>
                    <p className="font-medium text-violet-900">
                      ${item?.product?.price}
                    </p>
                    <p>
                      Availability:{" "}
                      <span
                        className={`font-medium ${
                          item?.product?.stock
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {item?.product?.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </p>

                    <div className="flex items-center gap-3">
                      <button
                        className="my-5 h-10 w-full bg-violet-900 text-white"
                        onClick={() => {
                          addCartHandle(item?.product?.id);
                        }}
                      >
                        Add to cart
                      </button>
                      <i
                        className="cursor-pointer"
                        onClick={() => handleDeleteItem(item?.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </i>
                    </div>
                  </div>
                </div>
              ))}
            </section>
            {/* desktop */}
            <section className="hidden w-full max-w-[1200px] grid-cols-1 gap-8 px-5 pb-10 md:grid">
              {wishlistItems.map((item) => (
                <div
                  className="flex w-full flex-row h-44 items-center justify-between border py-5 px-4"
                  key={item?.id}
                >
                  <div className="flex w-full items-center gap-4">
                    <img
                      width="150px"
                      className="object-contain"
                      src={`${conf.BACKEND_DOMAIN}${item?.product?.imgs?.[0]}`}
                      alt="Kitchen image"
                    />

                    <div className="flex w-2/5 flex-col justify-center">
                      <Link to={`/product/${item?.product?.id}`}>
                        <p className="text-xl font-bold hover:underline">
                          {item?.product?.title}
                        </p>
                      </Link>
                      <p className="text-gray-500">
                        Availability:
                        <span
                          className={`font-medium ${
                            item?.product?.stock
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {item?.product?.stock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex w-3/5 items-center justify-between flex-row">
                    <p className="mt-2 text-xl font-bold text-violet-900">
                      ${item?.product?.price}
                    </p>

                    <div className="mt-2 flex items-center">
                      <button
                        className="w-full px-2 bg-amber-400 py-2 lg:px-5"
                        onClick={() => {
                          addCartHandle(item?.product?.id);
                        }}
                      >
                        Add to cart
                      </button>

                      <i
                        className="ml-5 cursor-pointer"
                        onClick={() => handleDeleteItem(item?.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </i>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </>
        ) : (
          <div className="flex items-center flex-col justify-center gap-8 w-full">
            <span className="text-3xl font-bold">Your Wishlist is Empty</span>
            <img
              src="src/assets/images/empty-wishlist.png"
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
      </div>
    </>
  );
}

export default Wishlist;
