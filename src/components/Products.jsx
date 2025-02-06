import React, { useCallback, useEffect, useRef, useState } from "react";
import myBackend from "../backend/config";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, ProductCard, SnackBar } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { updatePage } from "../store/productSlice";

const Products = ({ limit = 12, pagination = true, sortby, order }) => {
  // States
  const [products, setProducts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const abortController = useRef();

  const catalog = useSelector((state) => state.catalog);
  const dispatch = useDispatch();

  // Methods
  const loadProducts = useCallback(
    async (controller) => {
      const data = await myBackend.getProducts({
        limit,
        sortby: sortby ? sortby : catalog?.ordering?.sort_by,
        order: order ? order : catalog?.ordering?.order,
        page: catalog?.page,
        categories: catalog?.filters?.categories,
        min_price: catalog?.filters?.price[0],
        max_price: catalog?.filters?.price[1],
        q: catalog?.q,
        controller
      });

      if (pagination) {
        setProducts(data);
      } else {
        setProducts((oldProducts) => {
          const results = oldProducts?.results || [];
          for (const product of data.results) {
            if (!results.find((p) => p.id === product.id)) {
              results.push(product);
            }
          }
          return {
            ...data,
            results,
          };
        });
      }

      setLoading(false);
    },
    [catalog] // Dependencies
  );
  const handleLoadMore = useCallback(() => {
    // Handle in infinite scroll
    setLoading(true);
    dispatch(updatePage(catalog?.page + 1));
  });

  // Hooks
  // useEffect(
  //   () => {
  //     if (page == 1) loadProducts();
  //     else setPage(1);
  //   },
  //   [catalog?.filters?.categories] // Dependencies
  // );

  useEffect(
    () => {
      if (pagination) window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      if (abortController.current) abortController.current.abort();
      const controller = new AbortController();
      abortController.current = controller;

      // if (params.get("min_price")) {
      //   setMinp(parseInt(params.get("min_price")));
      // } else setMinp(null);
      // if (params.get("max_price")) {
      //   setMaxp(parseInt(params.get("max_price")));
      // } else setMaxp(null);
      loadProducts(controller);
    },
    [catalog] // Dependencies
  );

  // useEffect(() => {
  //   if (params.get("page")) {
  //     console.log(params.get('page'))
  //     setPage(parseInt(params.get("page")));
  //   }
  // }, [params]);
  // useEffect(() => {
  //   setParams((prev) => ({ ...Object.fromEntries(prev.entries()), page }));
  // }, [page]);
  // useEffect(() => {
  //   if (categories.length) {
  //     setParams((prev) => ({
  //       ...Object.fromEntries(prev.entries()),
  //       cat: categories.join(","),
  //     }));
  //   } else {
  //     setParams(params.delete("cat"));
  //   }
  // }, [catalog?.filters?.categories]);

  return products === false ? (
    <>
      <section className="mx-auto grid max-w-[1200px] grid-cols-1 sm2:grid-cols-2 gap-3 px-5 pb-10 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: Math.min(limit, 4) }).map((_, i) => (
          <ProductCard key={i} />
        ))}
      </section>
    </>
  ) : (
    <>
      <section className="mx-auto grid max-w-[1200px] grid-cols-1 sm2:grid-cols-2 gap-3 px-5 pb-10 md:grid-cols-3 lg:grid-cols-4">
        {products?.results?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showMessage={showMessage}
            setShowMessage={setShowMessage}
            setSnackBarMessage={setSnackBarMessage}
          />
        ))}
      </section>

      {pagination ? (
        <Pagination
          className="flex justify-center"
          count={Math.ceil(products?.count / limit)}
          page={catalog?.page}
          onChange={(_, v) => dispatch(updatePage(v))}
        />
      ) : (
        <div className="flex justify-center">
          {Math.ceil(products?.count / limit) > catalog?.page && (
            <Button
              className={`bg-purple-800 p-2 min-h-[40px] min-w-32 text-yellow-300 hover:bg-purple-600 ${
                loading ? "bg-gray-200 hover:bg-gray-200" : ""
              }`}
              onClick={handleLoadMore}
              disabled={loading}
            >
              {!loading ? (
                "LOAD MORE"
              ) : (
                <Stack
                  spacing={2}
                  sx={{ color: "grey.500" }}
                  alignItems="center"
                >
                  <CircularProgress size="20px" color="inherit" />
                </Stack>
              )}
            </Button>
          )}
        </div>
      )}
      <SnackBar
        showMessage={showMessage}
        setShowMessage={setShowMessage}
        message={snackBarMessage}
      />
    </>
  );
};

export default Products;
