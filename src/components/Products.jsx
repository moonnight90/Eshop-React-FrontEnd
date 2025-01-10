import React, { useCallback, useEffect, useState } from "react";
import myBackend from "../backend/config";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, ProductCard, SnackBar } from "./index";

const Products = ({
  limit = 12,
  sortby,
  order,
  pagination = true,
  categories: defaultCategories,
  page,
  setPage,
  params,
  setParams,
}) => {
  // States
  const [products, setProducts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  // const [page, setPage] = useState(defaultPage);
  // const [params, setParams] = useSearchParams();

  const categories = React.useMemo(
    () => defaultCategories || [],
    [defaultCategories]
  );

  // Methods
  const loadProducts = useCallback(
    async (page) => {
      const data = await myBackend.getProducts({
        limit,
        sortby,
        order,
        page,
        categories,
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
    } // Dependencies
  );
  const handleLoadMore = useCallback(() => {
    // Handle in infinite scroll
    setLoading(true);
    setPage((prevPage) => prevPage + 1);
  }, []);

  // Hooks
  useEffect(
    () => {
      if (page == 1) loadProducts(page);
      else setPage(1);
    },
    [categories] // Dependencies
  );

  useEffect(
    () => {
      if (pagination) window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      loadProducts(page);
      
    },
    [sortby, order, limit,params] // Dependencies
  );

  // useEffect(() => {
  //   if (params.get("page")) {
  //     console.log(params.get('page'))
  //     setPage(parseInt(params.get("page")));
  //   }
  // }, [params]);
  useEffect(()=>{
    setParams((prev) => ({ ...Object.fromEntries(prev.entries()), page }));
  },[page])
  useEffect(() => {
    if (categories.length) {
      setParams((prev) => ({
        ...Object.fromEntries(prev.entries()),
        cat: categories.join(","),
      }));
    } else {
      setParams(params.delete("cat"));
    }
  }, [categories]);

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
        {products?.results.map((product) => (
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
          page={page}
          onChange={(e, v) => setPage(v)}
        />
      ) : (
        <div className="flex justify-center">
          {Math.ceil(products?.count / limit) > page && (
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
