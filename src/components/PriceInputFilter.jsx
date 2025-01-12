import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePage, updatePrice } from "../store/productSlice";

function PriceInputFilter() {
  

  const catalog = useSelector((state) => state.catalog);
  const dispatch = useDispatch();

  const [minPrice, setMinPrice] = useState(catalog?.filters?.price[0]);
  const [maxPrice, setMaxPrice] = useState(catalog?.filters?.price[1]);
  
  useEffect(()=>{
    setMinPrice(catalog?.filters?.price[0])
    setMaxPrice(catalog?.filters?.price[1])
  },[catalog?.filters?.price])
  

  const handlePrice = useCallback((e, state) => {
    // Remove all non-numeric characters
    const value = e.target.value.replace(/[^0-9]/g, "");

    if (state === "min") {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }
  }, []);

  const handel_price_filter = useCallback(() => {
    // setParams((prev) => {
    //   let updatedParams = Object.fromEntries(prev.entries());

    //   if (minPrice !== "") {
    //     updatedParams = { ...updatedParams, min_price: minPrice };
    //   } else delete updatedParams["min_price"];
    //   if (maxPrice !== "") {
    //     updatedParams = { ...updatedParams, max_price: maxPrice };
    //   } else delete updatedParams["max_price"];

    //   console.log(updatedParams);

    //   return updatedParams;
    // });
    dispatch(updatePage(1));
    dispatch(updatePrice([parseInt(minPrice),parseInt(maxPrice)]))
  });

  return (
    <div className="flex justify-between items-center gap-2">
      <input
        type="text"
        placeholder="Min"
        className="border-2 border-gray-300 p-2 w-[45%] focus:outline-none focus:border-purple-800"
        onChange={(e) => handlePrice(e, "min")}
        value={minPrice||""}
      />
      -
      <input
        type="text"
        placeholder="Max"
        className="border-2 border-gray-300 p-2 w-[45%] focus:outline-none focus:border-purple-800"
        value={maxPrice||""}
        onChange={(e) => handlePrice(e, "max")}
      />
      <button
        className="bg-violet-600 py-2 px-3 text-white shadow-md active:shadow-none hover:bg-violet-800"
        onClick={handel_price_filter}
      >
        Ok
      </button>
    </div>
  );
}

export default PriceInputFilter;
