import React, { useState } from "react";
import { Slider, Products } from "../components";
import myBackend from "../backend/config";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset } from "../store/productSlice";

function Home() {
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(1);
  const [params, setParams] = useSearchParams();
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    try {
      const products = await myBackend.getProducts({
        limit: 8,
        sortby: "title",
        order: "asc",
      });
      setProducts(products.results);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {    
    dispatch(reset());
    fetchProducts();
  }, []);
  return (
    <>
      <div className="relative">
        <img
          className="w-full object-cover brightness-50 filter lg:h-[500px]"
          src="src/assets/images/header-bg.jpeg"
          alt="Living room image"
        />

        <div className="absolute top-1/2 left-1/2 mx-auto flex w-11/12 max-w-[1200px] -translate-x-1/2 -translate-y-1/2 flex-col text-center text-white lg:ml-5">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-left">
            Best Collection for Home decoration
          </h1>
          <p className="pt-3 text-xs lg:w-3/5 lg:pt-5 lg:text-left lg:text-base">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consequatur aperiam natus, nulla, obcaecati nesciunt, itaque
            adipisci earum ducimus pariatur eaque labore.
          </p>
          <Link
            className="mx-auto mt-5 w-1/2 bg-amber-400 px-3 py-1 text-black duration-100 hover:bg-yellow-300 lg:mx-0 lg:h-10 lg:w-2/12 lg:px-10"
            to={"/catalog?cat=furniture"}
            target="_blank"
          >
            Explore Now
          </Link>
        </div>
      </div>

      <section className="container mx-auto my-8 flex flex-col justify-center gap-3 lg:flex-row">
        <div className="mx-5 flex flex-row items-center justify-center border-2 border-yellow-400 py-4 px-5">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 text-violet-900 lg:mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
          </div>

          <div className="ml-6 flex flex-col justify-center">
            <h3 className="text-left text-xs font-bold lg:text-sm">
              Free Delivery
            </h3>
            <p className="text-light text-center text-xs lg:text-left lg:text-sm">
              Orders from $200
            </p>
          </div>
        </div>

        <div className="mx-5 flex flex-row items-center justify-center border-2 border-yellow-400 py-4 px-5">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 text-violet-900 lg:mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          </div>

          <div className="ml-6 flex flex-col justify-center">
            <h3 className="text-left text-xs font-bold lg:text-sm">
              Money returns
            </h3>
            <p className="text-light text-left text-xs lg:text-sm">
              30 Days guarantee
            </p>
          </div>
        </div>

        <div className="mx-5 flex flex-row items-center justify-center border-2 border-yellow-400 py-4 px-5">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 text-violet-900 lg:mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
          </div>

          <div className="ml-6 flex flex-col justify-center">
            <h3 className="text-left text-xs font-bold lg:text-sm">
              24/7 Supports
            </h3>
            <p className="text-light text-left text-xs lg:text-sm">
              Consumer support
            </p>
          </div>
        </div>
      </section>

      <p className="mx-auto mt-10 mb-5 max-w-[1200px] px-5">TOP NEW ARRIVAL</p>
      <section
        className="mx-auto max-w-[1200px] "
        aria-label="Splide Basic HTML Example"
      >
        <Slider products={products} />
      </section>

      {/* 

      <section
        className="splide mx-auto max-w-[1200px] px-5 py-2"
        aria-label="Splide Basic HTML Example"
      >
        <div className="splide__track">
          <ul className="splide__list mx-auto max-w-[1200px]">
           
            <li className="splide__slide">
              <div className="flex flex-col">
                <img
                  className=""
                  src="src/assets/images/product-bigsofa.png"
                  alt="sofa image"
                />

                <div>
                  <p className="mt-2">GUYER CHAIR</p>
                  <p className="font-medium text-violet-900">
                    $45.00
                    <span className="text-sm text-gray-500 line-through">
                      $500.00
                    </span>
                  </p>

                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 text-yellow-400"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 text-yellow-400"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 text-yellow-400"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 text-yellow-400"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 text-gray-200"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <p className="text-sm text-gray-400">(38)</p>
                  </div>

                  <div>
                    <button className="my-5 h-10 w-full bg-violet-900 text-white">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </li>
           
          </ul>
        </div>
      </section>*/}

      <div className="mx-auto max-w-[1200px] px-5">
        <section className="mt-10 flex max-w-[1200px] justify-between bg-violet-900 px-5">
          <div className="py-8 px-3 lg:px-16">
            <p className="text-white">ONLINE EXCLUSIVE</p>
            <h2 className="pt-6 text-5xl font-bold text-yellow-400">15% OFF</h2>
            <p className="pt-4 text-white">
              ACCENT CHAIRS, <br />
              TABLES & OTTOMANS
            </p>
            <button
              href="#"
              className="mt-6 bg-amber-400 px-4 py-2 duration-100 hover:bg-yellow-300"
            >
              Shop now
            </button>
          </div>

          <img
            className="-mr-5 hidden w-[550px] object-cover md:block"
            src="src/assets/images/sale-bage.jpeg"
            alt="Rainbow credit card with macbook on a background"
          />
        </section>
      </div>
      <p className="mx-auto mt-10 mb-5 max-w-[1200px] px-5">TOP RATED</p>

      <Products
        limit={21}
        sortby="rating"
        order="desc"
        pagination={false}
        page={page}
        setPage={setPage}
        params={params}
        setParams={setParams}
      />
    </>
  );
}
export default Home;
