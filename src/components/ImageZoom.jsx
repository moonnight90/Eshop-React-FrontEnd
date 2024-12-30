import { useState, useRef } from "react";

const ImageZoomOwn = () => {
  const [hidden, setHidden] = useState(true);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zoomDimensions, setZoomDimensions] = useState({ width: 0, height: 0 });

  const imageRef = useRef(null);

  const mouseEnter = () => {
    if (imageRef.current) {
      // Get natural image dimensions and container dimensions
      const naturalWidth = imageRef.current.naturalWidth;
      const naturalHeight = imageRef.current.naturalHeight;
      const clientWidth = imageRef.current.clientWidth;
      const clientHeight = imageRef.current.clientHeight;

      // Store zoom scaling
      setZoomDimensions({
        width: naturalWidth / clientWidth,
        height: naturalHeight / clientHeight,
      });
    }
    setHidden(false);
  };

  const mouseLeave = () => setHidden(true);

  const mouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left; // X relative to image
    const y = e.clientY - rect.top; // Y relative to image
    setOffset({ x, y });
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <img
        ref={imageRef}
        src="https://dummyjson.com/image/1000x1000/008080/ffffff?text=Hello+Peter"
        alt="Main"
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onMouseMove={mouseMove}
        className="w-[500px] h-[300px] object-cover"
      />

      {/* Magnifier */}
      <div
        className={`absolute pointer-events-none border-2 border-gray-400 
          rounded-full shadow-lg ${hidden ? "hidden" : "block"}`}
        style={{
          width: "150px", // Size of the magnifier
          height: "150px",
          top: `${offset.y - 75}px`, // Center the magnifier
          left: `${offset.x - 75}px`,
          overflow: "hidden",
        }}
      >
        <img
          src="https://dummyjson.com/image/1000x1000/008080/ffffff?text=Hello+Peter"
          alt="Zoomed"
          style={{
            position: "absolute",
            top: `-${offset.y * zoomDimensions.height}px`, // Adjust to zoomed area
            left: `-${offset.x * zoomDimensions.width}px`,
            width: `${500 * zoomDimensions.width}px`, // Scale image for zoom
            height: `${300 * zoomDimensions.height}px`,
          }}
        />
      </div>
    </div>
  );
};

export default ImageZoomOwn;
