import React from "react";
import { Rating, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <Link to={`/product/${product?.id}`}>
      <div className=" pt-2 max-w-[200px] cursor-pointer bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl lg:max-w-[250px] ">
        <div className="w-[170px] max-w-[170px] md:max-w-[200px] lg:max-w-[250px] h-[250px] mx-auto rounded-lg flex flex-wrap items-center justify-center ">
          {(!loaded || !product?.thumbnail) && (
            <Skeleton
              animation="wave"
              variant="rounded"
              className="min-w-[150px] max-w-[150px] md:max-w-[200px] lg:max-w-[250px] min-h-[250px]"
            ></Skeleton>
          )}
          {product?.thumbnail && (
            <img
              src={product?.thumbnail}
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              alt="Product"
              onLoad={() => setLoaded(true)}
              className={`${loaded ? "block" : "hidden"}`}
            />
          )}
        </div>
        <div className="mt-2 p-4">
          {product?.title ? (
            <span className=" text-s sm:text-s overflow-hidden line-clamp-2 lg:text-md min-h-[48px]">
              {product?.title}
            </span>
          ) : (
            <Skeleton variant="rounded" width={"100%"} animation="wave" />
          )}
          <div className="flex items-center mt-2">
            {product?.price ? (
              <span className="text-xs lg:text-xl font-bold text-red-600">
                Rs.{product?.price}
              </span>
            ) : (
              <Skeleton variant="rounded" animation="wave" width="100%" />
            )}

            {product?.discountPercentage && (
              <span className="text-xs lg:text-sm text-gray-500 line-through ml-2">
                Rs.
                {(
                  product?.price +
                  (product?.price * product?.discountPercentage) / 100
                ).toFixed(2)}
              </span>
            )}
            {product?.discountPercentage && (
              <span className="ml-2 text-sm text-green-600">
                -{product?.discountPercentage}%
              </span>
            )}
          </div>
          <div className="flex items-center mt-2">
            <div className="flex items-center ">
              {product?.rating ? (
                <Rating
                  value={product?.rating}
                  precision={0.1}
                  size="small"
                  readOnly
                />
              ) : (
                <Skeleton variant="rounded" animation="wave" width="100%" />
              )}
            </div>
            {product?.stock ? (
              <span className="lg:ml-2 text-xs lg:text-sm text-gray-600">
                ({product?.stock})
              </span>
            ) : (
              <Skeleton variant="rounded" animation="wave" width="100%" />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

// export default Product
