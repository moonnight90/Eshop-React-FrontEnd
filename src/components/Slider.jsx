import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { ProductCard } from ".";

function Slider({ products }) {
  return (
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
        breakpoints:{
          640: {
            perPage: 2, 
          },

        }
      }}
    >
      {products
        ? products.map((product) => (
            <SplideSlide key={product.id}>
              <ProductCard product={product} />
            </SplideSlide>
          ))
        : Array.from({ length: 4 }).map((v, i) => (
            <SplideSlide key={i}>
              <ProductCard />
            </SplideSlide>
          ))}
    </Splide>
  );
}

export default Slider;
