import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../Nav/Nav";
import Header from "../Header/Header";
import Category from "../Cateogry/Category";
import Footer from "../Footer/Footer";
import Departments from "../Departments/Departments";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const MainLayout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const cartCount = cartItems.reduce((count: any, item: { quantity: any; }) => count + item.quantity, 0);

  return (
    <>
      <Nav />
      <Header cartCount={cartCount} />
      <Category />
      <main>
        <Outlet />
        <Departments />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
