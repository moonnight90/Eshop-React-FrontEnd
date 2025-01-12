import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { ProductCard, SnackBar } from ".";

function Slider({ products }) {
  const [showMessage, setShowMessage] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  return (
    <>
      <SnackBar
        showMessage={showMessage}
        setShowMessage={setShowMessage}
        message={snackBarMessage}
      />
      <Splide
        aria-label="My Favorite Images"
        options={{
          type: "loop",
          perPage: 4,
          perMove: 1,
          pagination: true,
          arrows: true,
          drag: true,
          gap: "1rem",
          breakpoints: {
            640: {
              perPage: 2,
            },
          },
        }}
      >
        {products
          ? products.map((product) => (
              <SplideSlide key={product.id}>
                <ProductCard
                  product={product}
                  showMessage={showMessage}
                  setShowMessage={setShowMessage}
                  setSnackBarMessage={setSnackBarMessage}
                />
              </SplideSlide>
            ))
          : Array.from({ length: 4 }).map((v, i) => (
              <SplideSlide key={i}>
                <ProductCard />
              </SplideSlide>
            ))}
      </Splide>
    </>
  );
}

export default Slider;
