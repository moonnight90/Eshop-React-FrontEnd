import { useEffect } from "react";

const SnackBar = ({ showMessage, setShowMessage, message }) => {
  useEffect(() => {
    showMessage &&
      setTimeout(() => {
        setShowMessage(false);
      }, 4000);
  }, [showMessage]);

  return (
    <div
      className={`fixed bottom-4 z-30 right-4 to-purple-800 bg-gradient-to-r from-purple-600 text-white text-sm shadow-lg p-4 flex items-center space-x-4 transition-all decoration-purple-200 ease-out transform 
        ${
          showMessage
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      style={{ transitionProperty: "transform, opacity" }}
    >
      {/* <span className="text-lg">🛒</span> */}
      <span>{message}</span>
      <button
        className="bg-yellow-400 text-purple-800 font-semibold px-3 py-1 hover:bg-yellow-500"
        onClick={() => setShowMessage(false)}
      >
        Close
      </button>
    </div>
  );
};

export default SnackBar;
