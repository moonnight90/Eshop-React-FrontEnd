import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { Logo } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../store/authSlice";
import { updateSearchQuery } from "../../store/productSlice";
import myBackend from "../../backend/config";
import backendAuth from "../../backend/auth";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import { setCartCount } from "../../store/cartSlice";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import NorthWestIcon from "@mui/icons-material/NorthWest";

function Header() {
  const user = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.cartCount);
  const catalog = useSelector((state) => state.catalog);

  // States
  const [showMenu, setShowMenu] = useState(false);
  const [showCats, setShowCats] = useState(false);
  const [suggestion, setSuggestion] = useState([]);
  const [searchQuery, setSearchQuery] = useState(catalog.q);
  const [autoCompleteShow, setAutoCompleteShow] = useState(false);
  const [showSearchPanelMobile, setShowSearchPanelMobile] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const abortSignale = useRef(null);
  // Methods

  const addDimensionsTransformationToUrl = (url, h, w) => {
    if (!url) return url;
    const splited = url.split("upload");

    return `${splited[0]}upload/w_${w},h_${h}${splited[1]}`;
  };

  const handle_logout = () => {
    dispatch(logout());
    setShowMenu(false);
    setShowCats(false);
    navigate("/");
  };

  const handleSearchQuery = (e) => {
    if (!autoCompleteShow) setAutoCompleteShow(true);
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    dispatch(updateSearchQuery(searchQuery));
    navigate(`catalog/?q=${searchQuery}`);
    setShowSearchPanelMobile(false);
  };

  useEffect(() => {
    if (abortSignale.current) {
      abortSignale.current.abort();
    }
    const controller = new AbortController();
    abortSignale.current = controller;
    async function get_suggestions(q, abortSignale) {
      if (q === "") {
        setSuggestion([]);
        return;
      }
      const resp = await myBackend.autoComplete(q, abortSignale);
      if (resp.status == 200) {
        setSuggestion(await resp.json());
      }
    }

    get_suggestions(searchQuery);
  }, [searchQuery]);

  // Hooks
  useEffect(() => {
    // setShowMenu(false);
    setShowCats(false);
  }, [location]);

  useEffect(() => {
    async function chnageCartQuantity() {
      const resp = await myBackend.getCart({ quantity_only: 1 });
      if (resp) {
        dispatch(setCartCount(resp?.total_quantity));
      }
    }
    chnageCartQuantity();

    async function update_user() {
      const resp = await backendAuth.me(user.user_token);
      const json_resp = await resp.json();
      dispatch(
        login({
          token: user.user_token,
          user: json_resp,
        })
      );
    }
    if (user.is_login) {
      update_user();
    }
  }, []);

  return (
    <>
      <header
        className={`mx-auto  flex h-16 max-w-[1200px] items-center justify-between px-5`}
      >
        <Link to={"/"}>
          <Logo />
        </Link>

        <div className="md:hidden ml-auto mr-4">
          <SearchIcon
            sx={{ fontSize: "25px" }}
            className="ml-auto cursor-pointer"
            onClick={() => setShowSearchPanelMobile(true)}
          />
        </div>
        {/* SearchPanelMobile */}
        {showSearchPanelMobile && (
          <section className="z-20 absolute inset-0 w-screen h-screen bg-white md:hidden">
            <div className="flex w-full justify-between items-center  p-2">
              <div
                className="px-3 cursor-pointer"
                onClick={() => setShowSearchPanelMobile(false)}
              >
                <ArrowBackIosIcon />
              </div>
              <input
                type="search"
                className="bg-gray-100 outline-none px-2 py-1 w-full "
                value={searchQuery}
                onChange={handleSearchQuery}
                onKeyDown={(e) => {
                  if (e.keyCode === 27) {
                    setShowSearchPanelMobile(false);
                  }
                }}
              />
              <button
                type="button"
                className="px-3"
                onClick={handleSearchSubmit}
              >
                <SearchIcon sx={{ fontSize: "20px" }} />
              </button>
            </div>
            <div>
              {suggestion
                ? suggestion.map((s) => (
                    <div
                      key={s.id}
                      className="w-[95%] flex m-auto py-2 text-left cursor-pointer hover:bg-gray-200 border-b-2 px-1"
                      onClick={() => {
                        navigate(`product/${s.id}`);
                        setShowSearchPanelMobile(false);
                      }}
                    >
                      <span className="w-[90%]">{s.title}</span>
                      <div className="text-gray-400 text-balance">
                        <NorthWestIcon className="m-auto" />
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          </section>
        )}
        {/* EndSearchPanelMobile */}
        <div className="flex gap-3 items-center justify-center">
          <Link
            to={user?.is_login ? "/cart" : "/login"}
            className="flex cursor-pointer flex-col items-center justify-center relative md:hidden"
          >
            {cartCount?.cartCount != 0 && (
              <span
                className="absolute bg-yellow-400 w-4 h-4 text-xs text-purple-800 bottom-6 left-[14px] rounded-full text-center"
                style={{ boxShadow: "0px 0px 8px 3px rgba(0, 0, 0, 0.2)" }}
              >
                {cartCount?.cartCount}
              </span>
            )}
            <FaShoppingCart className="h-5 w-5" />
            <p className="text-xs">Cart</p>
          </Link>
          <span
            onClick={() => setShowMenu(!showMenu)}
            className="relative ml-auto flex cursor-pointer items-center justify-center md:hidden"
          >
            <span className="h-7 w-7">
              {user.is_login ? (
                <img
                  src={addDimensionsTransformationToUrl(
                    user?.user?.image,
                    100,
                    100
                  )}
                  alt="profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FaRegCircleUser className="w-full h-full" />
              )}
            </span>
            <ArrowDropDownIcon />
            {
              <menu
                className={`absolute z-10 top-[130%] right-0 bg-gray-100 text-violet-600 shadow-xl
              transition-all duration-300 overflow-hidden
            ${showMenu ? "max-h-[500px]" : "max-h-0"}
            `}
              >
                <ul className=" min-w-48 p-2">
                  {user.is_login && (
                    <>
                      <Link to="account">
                        <li className="px-5 py-2 hover:text-yellow-500">
                          Profile
                        </li>
                      </Link>
                      <Link to="wishlist">
                        <li className="px-5 py-2 hover:text-yellow-500">
                          Wishlist
                        </li>
                      </Link>
                      <Link to="manage-address">
                        <li className="px-5 py-2 hover:text-yellow-500">
                          Manage Address
                        </li>
                      </Link> 
                      <Link to="order-history">
                        <li className="px-5 py-2 hover:text-yellow-500">
                          Orders
                        </li>
                      </Link>
                      <Link to="change-password">
                        <li className="px-5 py-2 hover:text-yellow-500">
                          Change Password
                        </li>
                      </Link>
                      <hr />
                    </>
                  )}

                  <Link to="catalog">
                    <li className="px-5 py-2 hover:text-yellow-500">Catalog</li>
                  </Link>

                  <Link to="contact-us">
                    <li className="px-5 py-2 hover:text-yellow-500">
                      Contact us
                    </li>
                  </Link>
                  <hr />
                  {user.is_login ? (
                    <Link onClick={() => dispatch(logout())}>
                      <li className="px-5 py-2 hover:text-yellow-500">
                        Logout
                      </li>
                    </Link>
                  ) : (
                    <Link to={"/login"}>
                      <li className="px-5 py-2 hover:text-yellow-500">Login</li>
                    </Link>
                  )}
                </ul>
              </menu>
            }
          </span>
        </div>
        {/* <div className={`md:hidden`}>
          <button onClick={() => setShowMenu(!showMenu)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div> */}

        {/* search Item */}
        <form
          className="hidden h-9 w-2/5 items-center gap-1 pl-1 border md:flex relative"
          onSubmit={handleSearchSubmit}
        >
          <SearchIcon sx={{ fontSize: "20px" }} />

          <input
            className="hidden w-11/12 outline-none md:block"
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchQuery}
            onFocus={() => setAutoCompleteShow(true)}
            onBlur={() => setAutoCompleteShow(false)}
            onKeyDown={(e) => {
              if (e.keyCode === 27) setAutoCompleteShow(false);
            }}
          />

          <button className="ml-auto h-full bg-amber-400 px-4 hover:bg-yellow-300">
            Search
          </button>
          {autoCompleteShow && (
            <div className="absolute top-10 z-20 left-0 w-full bg-slate-100 shadow-2xl">
              {suggestion
                ? suggestion.map((s) => (
                    <div
                      key={s.id}
                      className="w-full flex text-left py-1 px-2 cursor-pointer hover:bg-gray-200 border-b-2"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setAutoCompleteShow(false);
                        navigate(`product/${s.id}`);
                      }}
                    >
                      <span className="w-[95%]">{s.title}</span>
                      <div
                        onMouseDown={(e) => {
                          e.stopPropagation();

                          setSearchQuery(s.title);
                        }}
                      >
                        <NorthWestIcon className="text-gray-400 " />
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          )}
        </form>

        <div className="hidden gap-3 md:!flex">
          <Link
            to="wishlist"
            className="flex cursor-pointer flex-col items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>

            <p className="text-xs">Wishlist</p>
          </Link>

          <Link
            to={user?.is_login ? "/cart" : "/login"}
            className="flex cursor-pointer flex-col items-center justify-center relative"
          >
            {cartCount?.cartCount != 0 && (
              <span
                className="absolute bg-yellow-400 w-5 h-5 text-sm text-purple-800 bottom-8 left-4 rounded-full text-center"
                style={{ boxShadow: "0px 0px 8px 3px rgba(0, 0, 0, 0.2)" }}
              >
                {cartCount?.cartCount}
              </span>
            )}
            <FaShoppingCart className="h-6 w-6" />
            <p className="text-xs">Cart</p>
          </Link>

          <Link
            to={user.is_login ? "/account" : "/login"}
            className="relative flex cursor-pointer flex-col items-center justify-center"
          >
            <span className="h-6 w-6">
              {user.is_login ? (
                <img
                  src={addDimensionsTransformationToUrl(
                    user?.user?.image,
                    100,
                    100
                  )}
                  alt="profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FaRegCircleUser className="w-full h-full" />
              )}
            </span>
            <p className="text-xs">Account</p>
          </Link>
        </div>
      </header>
      <nav className="relative bg-violet-900">
        <div className="mx-auto hidden h-12 w-full max-w-[1200px] justify-center items-center items-center md:flex">
          {/* <button
            className="ml-5 flex h-full w-40 cursor-pointer items-center justify-center bg-amber-400"
            onClick={() => setShowCats(!showCats)}
          >
            <div className="flex justify-around" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mx-1 h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              All categories
            </div>
          </button> */}

          <div className="mx-7 flex gap-8">
            <Link
              className="font-light text-white duration-100 hover:text-yellow-400 hover:underline"
              to={"/"}
            >
              Home
            </Link>
            <Link
              className="font-light text-white duration-100 hover:text-yellow-400 hover:underline"
              to="catalog"
            >
              Catalog
            </Link>

            <Link
              className="font-light text-white duration-100 hover:text-yellow-400 hover:underline"
              to="contact-us"
            >
              Contact Us
            </Link>
          </div>
          
        </div>
      </nav>
      {/* <!-- /Nav bar --> */}

      {/* <!-- Menu  --> */}
      <section
        className={`absolute left-0 right-0 z-10 w-full border-b border-r border-l bg-white ${
          showCats ? "" : "hidden"
        }`}
        // style="display: none"
      >
        <div className="mx-auto flex max-w-[1200px] py-10">
          <div className="w-[300px] border-r">
            <ul className="px-5">
              <li className="active:blue-900 flex items-center gap-2 bg-amber-400 py-2 px-3 active:bg-amber-400">
                <img
                  width="15px"
                  height="15px"
                  src="src/assets/images/bed.svg"
                  alt="Bedroom icon"
                />
                Bedroom
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </li>

              <li className="active:blue-900 flex items-center gap-2 py-2 px-3 hover:bg-neutral-100 active:bg-amber-400">
                <img
                  width="15px"
                  height="15px"
                  src="src/assets/images/sleep.svg"
                  alt="bedroom icon"
                />
                Matrass
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </li>

              <li className="active:blue-900 flex items-center gap-2 py-2 px-3 hover:bg-neutral-100 active:bg-amber-400">
                <img
                  width="15px"
                  height="15px"
                  src="src/assets/images/outdoor.svg"
                  alt="bedroom icon"
                />
                Outdoor
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </li>

              <li className="active:blue-900 flex items-center gap-2 py-2 px-3 hover:bg-neutral-100 active:bg-amber-400">
                <img
                  width="15px"
                  height="15px"
                  src="src/assets/images/sofa.svg"
                  alt="bedroom icon"
                />
                Sofa
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </li>

              <li className="active:blue-900 flex items-center gap-2 py-2 px-3 hover:bg-neutral-100 active:bg-amber-400">
                <img
                  width="15px"
                  height="15px"
                  src="src/assets/images/kitchen.svg"
                  alt="bedroom icon"
                />
                Kitchen
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </li>

              <li className="active:blue-900 flex items-center gap-2 py-2 px-3 hover:bg-neutral-100 active:bg-amber-400">
                <img
                  width="15px"
                  height="15px"
                  src="src/assets/images/food.svg"
                  alt="Food icon"
                />
                Living room
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </li>
            </ul>
          </div>

          <div className="flex w-full justify-between">
            <div className="flex gap-6">
              <div className="mx-5">
                <p className="font-medium text-gray-500">BEDS</p>
                <ul className="text-sm leading-8">
                  <li>
                    <a href="product-overview.html">Italian bed</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Queen-size bed</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Wooden craft bed</a>
                  </li>
                  <li>
                    <a href="product-overview.html">King-size bed</a>
                  </li>
                </ul>
              </div>

              <div className="mx-5">
                <p className="font-medium text-gray-500">LAMPS</p>
                <ul className="text-sm leading-8">
                  <li>
                    <a href="product-overview.html">Italian Purple Lamp</a>
                  </li>
                  <li>
                    <a href="product-overview.html">APEX Lamp</a>
                  </li>
                  <li>
                    <a href="product-overview.html">PIXAR lamp</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Ambient Nightlamp</a>
                  </li>
                </ul>
              </div>

              <div className="mx-5">
                <p className="font-medium text-gray-500">BEDSIDE TABLES</p>
                <ul className="text-sm leading-8">
                  <li>
                    <a href="product-overview.html">Purple Table</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Easy Bedside</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Soft Table</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Craft Table</a>
                  </li>
                </ul>
              </div>

              <div className="mx-5">
                <p className="font-medium text-gray-500">SPECIAL</p>
                <ul className="text-sm leading-8">
                  <li>
                    <a href="product-overview.html">Humidifier</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Bed Cleaner</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Vacuum Cleaner</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Pillow</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;
