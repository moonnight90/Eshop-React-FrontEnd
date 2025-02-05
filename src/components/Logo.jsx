import React from "react";

function Logo({ h, w }) {
  return (
    <img
      className="cursor-pointer sm:h-auto sm:w-auto "
      src="https://res.cloudinary.com/dmz847afv/image/upload/v1738737097/static/ga9i83d6haqorpwvyncg.svg"
      alt="company logo"
      loading="lazy"
    />
  );
}

export default Logo;
