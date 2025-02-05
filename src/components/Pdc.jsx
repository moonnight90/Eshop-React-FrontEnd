import React, { useState, useEffect, useCallback } from "react";
import LazyLoad from "react-lazyload";
import { Rating, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import myBackend from "../backend/config";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCartCount } from "../store/cartSlice";
function Pdc({ product, showMessage, setShowMessage, setSnackBarMessage }) {
  // States
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Methods
  const addDimensionsTransformationToUrl = (url,h,w)=>{
    if (!url) return url;
    const splited = url.split('upload');
    
    return `${splited[0]}upload/h_${h}${splited[1]}`;
    
  }
  
  // Hooks
  useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product]);

  const addToCart = async (product) => {
    if (!user.is_login) {
      window.scroll(0, 0);
      navigate("/login");
    }
    const resp = await myBackend.addToCart({
      product_id: product.id,
      quantity: 1,
    });
    if (resp?.status == 200) {
      setSnackBarMessage(resp?.success);
      if (showMessage) {
        setShowMessage(false);
        setTimeout(() => setShowMessage(true), 100);
      } else {
        setShowMessage(true);
      }
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
  };

  const handleAddtoWishlist = useCallback(async (id) => {
    const resp = await myBackend.addtoWishlist(user.user_token, id);
    if (resp.status == 200) {
      setSnackBarMessage("Added to wishlist ...");
      setShowMessage(true);
    }
  });
  return (
    <div className="flex flex-col border hover:shadow-xl mt-2 hover:shadow-slate-300 p-2">
      {loading ? (
        <Skeleton
          variant="rounded"
          animation="wave"
          width="100%"
          height={192}
        />
      ) : (
        <div className="relative flex">
          <LazyLoad height={200} offset={100} className="w-full">
            <img
              className="h-48 w-full object-contain z-50"
              src={addDimensionsTransformationToUrl(product?.imgs[0],200,200)}
              alt="product image"
              // onLoad={() => setLoading(false)}
              loading="lazy"
            />
          </LazyLoad>
          <div className="absolute flex h-full w-full items-center justify-center gap-3 opacity-0 duration-150 hover:opacity-100">
            <Link to={`/product/${product.id}`}>
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
            </Link>
            <span
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-amber-400"
              onClick={() => handleAddtoWishlist(product?.id)}
            >
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
          <div className="absolute right-1 mt-3 flex items-center justify-center bg-amber-400">
            <p className="px-2 py-2 text-sm">− {product?.discount}% OFF</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="mt-2">
          <Skeleton variant="text" animation="wave" width="60%" />
          <Skeleton variant="text" animation="wave" width="40%" />
          <Skeleton variant="text" animation="wave" width="50%" />
          <Skeleton variant="squre" animation="wave" width="100%" height={40} />
        </div>
      ) : (
        <div>
          <Link to={`/product/${product.id}`}>
            <p className="mt-2 min-h-12 line-clamp-2 hover:underline">
              {product?.title}
            </p>
          </Link>
          <p className="font-medium text-violet-900">
            ${(product?.price).toFixed(2)}
            <span className="text-sm text-gray-500 line-through">
              {" "}
              $
              {(
                product?.price * (product?.discount / 100) +
                product?.price
              ).toFixed(2)}
            </span>
          </p>

          <div className="flex items-center">
            <Rating precision={0.1} value={product?.rating} readOnly />
            <p className="text-sm text-gray-400">({product?.rating})</p>
          </div>

          <div>
            <button
              onClick={() => addToCart(product)}
              className=" h-10 w-full bg-purple-800 text-white hover:bg-purple-600"
            >
              Add to cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pdc;
