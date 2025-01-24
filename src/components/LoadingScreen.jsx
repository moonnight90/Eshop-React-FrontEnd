import React from "react";
import {LoadingAnimation} from '.'

function LoadingScreen() {
  return (
    <div className="fixed z-10 items-center justify-center flex inset-0 bg-black bg-opacity-40">
      <span className="  p-2">
        <LoadingAnimation />
      </span>
    </div>
  );
}

export default LoadingScreen;
