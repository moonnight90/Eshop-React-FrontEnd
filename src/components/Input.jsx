import React, { useId, forwardRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Input(
  { label, type, className = "", inputClassName = "", ...props },
  ref
) {
  const id = useId();

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={`${className} flex flex-col gap-1 `}>
      {label && (
        <label className="block " id={id}>
          {" "}
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={!showPassword ? type : "text"}
          ref={ref}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${inputClassName}`}
          id={id}
          {...props}
        />
        {type === "password" && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className=" select-none absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-lg"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
    </div>
  );
}

export default forwardRef(Input);
