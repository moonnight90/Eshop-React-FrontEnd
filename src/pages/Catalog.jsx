import React, { Suspense, lazy, useCallback, useEffect, useState } from "react";
import myBackend from "../backend/config";
import { Link, useSearchParams } from "react-router-dom";
import { Skeleton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { LoadingScreen } from "../components";
// Lazy load the Products component
const Products = lazy(() => import("../components/Products"));

function Catalog() {
  // States
  const [sort, setSort] = useState({
    sortby: "title",
    order: "asc",
  });
  const [categories, setCategories] = useState(false);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [params, setParams] = useSearchParams();
  const [page, setPage] = useState(1);

  // Hooks
  useEffect(() => {
    async function fetchCategories() {
      try {
        const cats = await myBackend.categories();
        setCategories(cats);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      }
    }
    const categories_str = params.get("cat");
    console.log(categories_str);

    if (categories_str) setCheckedCategories(categories_str.split(","));

    fetchCategories(); // Call the async function inside useEffect
  }, []);

  // Methods

  const handleCategory = useCallback((e) => {
    if (e.target.checked) {
      setCheckedCategories((prev) => [...prev, e.target.value]);
    } else {
      setCheckedCategories((prev) => prev.filter((v) => v != e.target.value));
    }
  });

  const handleSort = useCallback((e) => {
    const targetValue = e.target.value;

    if (targetValue === "top-rated") {
      setSort({
        sortby: "rating",
        order: "desc",
      });
    } else if (targetValue === "price-asc") {
      setSort({
        sortby: "price",
        order: "asc",
      });
    } else if (targetValue === "price-desc") {
      setSort({
        sortby: "price",
        order: "desc",
      });
    } else {
      setSort({
        sortby: "title",
        order: "asc",
      });
    }
  });

  return (
    <div className="flex flex-col justify-between">
      <nav className="mx-auto w-full mt-4 max-w-[1200px] px-5">
        <ul className="flex items-center">
          <li className="cursor-pointer">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            </Link>
          </li>
          <li>
            <span className="mx-2 text-gray-500">&gt;</span>
          </li>
          <li className="text-gray-500">Catalog</li>
        </ul>
      </nav>
      <section className="container mx-auto flex-grow max-w-[1200px] border-b py-5 md:flex md:flex-row md:py-10">
        {/* Filters */}
        {/* Desktop View */}
        <section className="hidden w-[300px] flex-shrink-0 px-4 md:block">
          <div className="flex pb-5">
            <div className="w-full">
              <p className="mb-3 font-medium ">CATEGORIES</p>
              <div className="h-96 overflow-y-auto px-2">
                {categories === false ? (
                  <>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <Skeleton
                        key={i}
                        variant="text"
                        animation="wave"
                        width="100%"
                        height={"35px"}
                      />
                    ))}
                  </>
                ) : (
                  categories.map((category) => (
                    <div
                      className="flex w-full justify-between"
                      key={category?.id}
                    >
                      <div className="flex justify-center items-center">
                        <input
                          type="checkbox"
                          value={category?.name}
                          onChange={handleCategory}
                          checked={checkedCategories.includes(category?.name)}
                        />
                        <p className="ml-4 text-gray-700 font-normal">
                          {category?.name.charAt(0).toUpperCase() +
                            category?.name.slice(1).toLowerCase()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">
                          ({category?.products_count})
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div>
            <p className="mb-3 font-medium">Price</p>
            <div>hello</div>
          </div>
        </section>
        {/* Desktop View-End */}
        {/* Mobile View */}
        <section
          className={`md:hidden fixed top-0 bg-gray-100 z-10 min-w-[300px] h-screen p-6 transition-all duration-500 ease-in-out ${
            showFilters ? "left-0" : "-left-80"
          }
           shadow-2xl
          `}
        >
          <div className="flex">
            <div className="text-purple-700 font-bold text-xl w-[90%]">
              Filters
            </div>
            <button
              className="m-auto absolute top-4 right-4 text-gray-800 text-2xl"
              onClick={() => setShowFilters(false)}
            >
              <CloseIcon fontSize="inherit" />
            </button>
          </div>
          <p className="mt-3 mb-3 font-semibold text-gray-700 ">CATEGORIES</p>
          <div className="h-96 overflow-y-auto ">
            {categories === false ? (
              <>
                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    variant="text"
                    animation="wave"
                    width="100%"
                    height={"35px"}
                  />
                ))}
              </>
            ) : (
              categories.map((category) => (
                <div className="flex w-full justify-between" key={category?.id}>
                  <div className="flex justify-center items-center">
                    <input
                      type="checkbox"
                      value={category?.name}
                      onChange={handleCategory}
                      checked={checkedCategories.includes(category?.name)}
                    />
                    <p className="ml-4 text-gray-700 font-normal">
                      {category?.name.charAt(0).toUpperCase() +
                        category?.name.slice(1).toLowerCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">
                      ({category?.products_count})
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
        {/* Filters-End */}

        <div className="w-full">
          <div className="mb-5 flex items-center justify-between lg:justify-end px-5">
            <button
              className=" md:hidden"
              onClick={() => {
                setShowFilters(true);
              }}
            >
              <FilterAltIcon />
            </button>

            <select
              className="border-2 border-yellow-400 p-3 text-purple-900 focus:outline-none focus:border-purple-800 transition duration-300 ease-in-out"
              defaultValue={""}
              onChange={handleSort}
            >
              <option value="" disabled hidden>
                Sort By
              </option>
              <option value="top-rated" className="bg-white text-purple-900">
                Top Rated
              </option>
              <option value="price-asc" className="bg-white text-purple-900">
                Price (ASC)
              </option>
              <option value="price-desc" className="bg-white text-purple-900">
                Price (DESC)
              </option>
            </select>
          </div>
          <hr />
          <Suspense fallback={<Skeleton variant="rectangular" height={400} />}>
            <Products
              limit={24}
              {...sort}
              categories={checkedCategories}
              page={page}
              setPage={setPage}
              setParams={setParams}
              params={params}
            />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

export default Catalog;
