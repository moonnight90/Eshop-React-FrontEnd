import React from "react";
import * as motion from "motion/react-client";

const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        className="w-9 h-9 bg-violet-900 rounded-full absolute top-1/2"
        animate={{
          x: [0, 13, 20, 20, 13, 0, -13, -20, -20, -13, 0], // Move left to right and back
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      <motion.div
        className="w-9 h-9 bg-amber-400 rounded-full absolute top-1/2"
        animate={{
          x: [0, -13, -20, -20, -13, 0, 13, 20, 20, 13, 0], //
        }}
        transition={{
          duration: 1,
          // ease: "easeInOut",
          type: "keyframes",
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export default LoadingAnimation;
