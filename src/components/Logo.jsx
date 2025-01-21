import React from "react";

function Logo({ h, w }) {
  return (
    <img
      className="cursor-pointer sm:h-auto sm:w-auto "
      src="src/assets/images/company-logo.svg"
      alt="company logo"
    />
  );
}

export default Logo;
