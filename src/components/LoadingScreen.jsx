import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingScreen() {
  return (
    <div className="fixed z-10 items-center justify-center flex inset-0 bg-black bg-opacity-70">
      <span className="  p-2">
        <CircularProgress size={20} />
      </span>
    </div>
  );
}

export default LoadingScreen;
