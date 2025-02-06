import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { CartCounter, SnackBar, LoadingScreen } from "../components";
import myBackend from "../backend/config";
import { CircularProgress, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCartCount } from "../store/cartSlice";
import useDocumentTitle from "../CustomHook/useDocumentTitle";
function Product() {
  // States
  const documentTitle = useDocumentTitle("Loading...");
  const [product, setProduct] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWhislist, setLoadingWhislist] = useState(false);
  const quantityRef = useRef();
  const { id } = useParams();
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Methods
  const loadProduct = async () => {
    const data = await myBackend.getProduct({ id });
    setProduct(data);
    documentTitle(data?.title);
  };
  const addDimensionsTransformationToUrl = (url, h, w) => {
    if (!url) return url;
    const splited = url.split("upload");

    return `${splited[0]}upload/w_${w},h_${h}${splited[1]}`;
  };

  const addCartHandle = async () => {
    setLoadingCart(true);
    if (!user.is_login) {
      window.scroll(0, 0);
      navigate("/login");
    }

    const resp = await myBackend.addToCart({
      product_id: product?.id,
      quantity,
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
    setLoadingCart(false);
  };

  const handleAddtoWishlist = useCallback(async (id) => {
    setLoadingWhislist(true);
    const resp = await myBackend.addtoWishlist(user.user_token, id);
    if (resp.status == 200) {
      setSnackBarMessage("Added to wishlist ...");
      setShowMessage(true);
    }
    setLoadingWhislist(false);
  });

  //Hooks
  useEffect(() => {
    loadProduct();
  }, [id]);

  useEffect(() => window.scrollTo(0, 0), [product]);
  return (
    <>
      <SnackBar
        showMessage={showMessage}
        setShowMessage={setShowMessage}
        message={snackBarMessage}
      />
      {product ? (
        <>
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

              <li className="text-gray-500">{product.title}</li>
            </ul>
          </nav>
          <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
            <div className=" flex justify-center flex-col items-center overflow-hidden">
              <img
                className="cursor-pointer border-solid border-2 object-contain h-96 w-96"
                src={addDimensionsTransformationToUrl(
                  product?.imgs[currentImg],
                  500,
                  500
                )}
                alt=""
              />

              <div className="mt-3 flex justify-center gap-1 overflow-auto">
                {product?.imgs.map((img, i) => (
                  <div
                    key={i}
                    className={`h-14 flex justify-center min-w-14 ${
                      currentImg == i ? " border-yellow-500 border-2" : "border"
                    }`}
                    onMouseEnter={() => setCurrentImg(i)}
                  >
                    <img
                      className="cursor-pointer object-contain max-w-full max-h-full"
                      src={addDimensionsTransformationToUrl(img, 100, 100)}
                      alt={`image_${i}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto px-5 lg:px-5">
              <h2 className="pt-3 text-2xl font-bold lg:pt-0">
                {product.title}
              </h2>
              <div className="mt-1">
                <div className="flex items-center">
                  <Rating value={product?.rating} readOnly precision={0.1} />
                  <p className="ml-3 text-sm text-gray-400">
                    ({product?.review_count} reviews)
                  </p>
                </div>
              </div>

              <p className="mt-5 font-bold">
                Availability:{" "}
                {product?.stock ? (
                  <span className="text-green-600">In Stock</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </p>
              {/* <p className="font-bold">
                Brand: <span className="font-normal">{product?.brand}</span>
              </p> */}
              <p className="font-bold">
                Catagory:{" "}
                <span className="font-normal">{product?.category?.name}</span>
              </p>
              <p className="font-bold">
                SKU: <span className="font-normal">{product?.sku}</span>
              </p>
              <p className="font-bold">
                WEIGHT: <span className="font-normal">{product?.weight}</span>
              </p>

              <p className="mt-4 text-4xl font-bold text-violet-900">
                ${`${product?.price} `}
                <span className="text-xs text-gray-400 line-through">
                  $
                  {(
                    product?.price * (product?.discount / 100) +
                    product?.price
                  ).toFixed(2)}
                </span>
              </p>

              <p className="pt-5 text-sm leading-5 text-gray-500">
                {product?.description}
              </p>

              {/* <div className="mt-6">
                <p className="pb-2 text-xs text-gray-500">Color</p>

                <div className="flex gap-1">
                  <div className="h-8 w-8 cursor-pointer border border-white bg-gray-600 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"></div>
                  <div className="h-8 w-8 cursor-pointer border border-white bg-violet-900 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"></div>
                  <div className="h-8 w-8 cursor-pointer border border-white bg-red-900 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"></div>
                </div>
              </div> */}

              <div className="mt-6">
                <p className="pb-2 text-xs text-gray-500">Quantity</p>
                <CartCounter
                  ref={quantityRef}
                  onQuantityChange={(q) => setQuantity(q)}
                  max_val={product?.stock}
                />
              </div>

              <div className="mt-7 flex flex-row items-center gap-6">
                <button
                  onClick={addCartHandle}
                  className={`flex h-12 w-1/3 min-w-[140px] items-center justify-center text-white ${
                    product?.stock
                      ? "bg-purple-800  hover:bg-purple-600 cursor-pointer"
                      : "bg-gray-500"
                  }`}
                  disabled={(!product?.stock || loadingCart)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="mr-3 h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  Add to cart
                  {loadingCart&&<CircularProgress size={20} sx={{marginLeft:"10px"}} color="inherit" />}
                </button>
                <button
                  className="flex h-12 w-1/3 min-w-[140px] items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300"
                  onClick={() => handleAddtoWishlist(product?.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="mr-3 h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                  Wishlist
                  {loadingWhislist&&<CircularProgress size={20} sx={{marginLeft:"10px"}} color="inherit" />}
                </button>
              </div>
            </div>
          </section>
        </>
      ) : (
        <LoadingScreen />
        
      )}
    </>
  );
}

export default Product;
