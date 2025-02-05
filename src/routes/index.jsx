import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Login, Signup, AuthLayout } from "../components";
import Home from "../pages/Home";
import Product from "../pages/Product";
import ProfileInformation from "../pages/ProfileInformation";
import ManageAddress from "../pages/ManageAddress";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import ChangePassword from "../pages/ChangePassword";
import PlaceOrder from "../pages/PlaceOrder";
import OrderConfirm from "../pages/OrderConfirm";
import OrderHistroy from "../pages/OrderHistroy";
import Wishlist from "../pages/Wishlist";
import ContactUs from "../pages/ContactUs";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: (
          <AuthLayout authenticated={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthLayout authenticated={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "product/:id",
        element: <Product />,
      },

      {
        path: "account",
        element: (
          <AuthLayout authenticated={true}>
            <ProfileInformation />
          </AuthLayout>
        ),
      },
      {
        path: "manage-address",
        element: (
          <AuthLayout authenticated={true}>
            <ManageAddress />
          </AuthLayout>
        ),
      },
      {
        path: "change-password",
        element: (
          <AuthLayout authenticated={true}>
            <ChangePassword />
          </AuthLayout>
        ),
      },
      {
        path: "catalog",
        element: <Catalog />,
      },
      {
        path: "cart",
        element: (
          <AuthLayout authenticated={true}>
            <Cart />
          </AuthLayout>
        ),
      },
      {
        path: "place-order",
        element: (
          <AuthLayout authenticated={true}>
            <PlaceOrder />
          </AuthLayout>
        ),
      },
      {
        path: "order-confirm",
        element: <OrderConfirm />,
      },
      {
        path: "order-history",
        element: <OrderHistroy />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "contact-us",
        element: <ContactUs />
      }
    ],
  },
]);
