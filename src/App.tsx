import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./components/store/store";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./components/layout/Home";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Cart from "./components/AddToCart/Cart";
import Login from "./utils/login";
import Register from "./utils/register";
import UserProfile from "./components/UserProfile/UserProfile";
import { setUser, setLoading } from "./components/store/userSlice";
import { setCartItems } from "./components/store/CartSlice";
import { RootState } from "./components/store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { auth } from "./utils/firebase";

const routes = [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/Home",
    element: <MainLayout />,
    children: [
      {
        path: "/Home",
        element: <Home />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            displayName: firebaseUser.displayName,
          })
        );

        const firebaseURL = `https://easyshop-fe29c-default-rtdb.firebaseio.com/carts/${firebaseUser.uid}.json`;
        const response = await fetch(firebaseURL);
        if (response.ok) {
          const cartData = await response.json();
          const items = cartData || []; 
          dispatch(setCartItems(items));
          localStorage.setItem("cartItems", JSON.stringify(items));
        }
      } else {
        dispatch(setUser(null));
        dispatch(setCartItems([]));
        localStorage.removeItem("cartItems");
      }
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (!loading && user) {
      const cartItemsFromLocalStorage = JSON.parse(
        localStorage.getItem("cartItems") || "[]"
      );
      if (cartItemsFromLocalStorage.length > 0) {
        dispatch(setCartItems(cartItemsFromLocalStorage));
      }
    }
  }, [loading, user, dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
