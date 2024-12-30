import React, { useEffect, useImperativeHandle } from "react";

function CartCounter(
  { default_quantity = 1, onQuantityChange = () => {}, disable, max_val=10},
  ref
) {
  const [quantity, setQuantity] = React.useState(default_quantity);
  const [isMounted, setIsMounted] = React.useState(false);
  const handleQuantity = (value) => {
    setQuantity((prev) => Math.max(1, Math.min(Math.min(10,max_val), prev + value)));
  };
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    } else {ref={ref}
      onQuantityChange(quantity);
    }
  }, [quantity]);

  useImperativeHandle(ref, () => ({
    setQuantity,
  }));
  return (
    <div className="w-full flex ">
      <button
        onClick={() => handleQuantity(-1)}
        className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-gray-500 active:bg-gray-200"
        disabled={disable}
      >
        &minus;
      </button>

      <input
        readOnly
        className="flex h-8 w-8 cursor-pointer items-center justify-center text-center bg-gray-100 "
        value={quantity}
        // ref={ref}
      />

      <button
        onClick={() => handleQuantity(1)}
        className="flex h-8 w-8 cursor-pointer items-center justify-center border hover:bg-neutral-100 active:bg-gray-200"
        disabled={disable}
      >
        &#43;
      </button>
    </div>
  );
}

export default React.forwardRef(CartCounter);
