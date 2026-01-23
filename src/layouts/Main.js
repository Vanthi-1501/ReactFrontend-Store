import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import Cart from "../pages/cart/Cart";
import Profile from "../pages/user/Profile";
import Category from "./Category";
import Home2 from "../pages/home2/Home2";
import Listing from "../pages/product/Listing";
import ListingGrid from "../pages/product/ListingGrid";
import SimplePage from "../pages/content/SimplePage";
import ProductDetail from "../pages/product/ProductDetail";
import Checkout from "../pages/cart/Checkout";
import PaymentSuccess from "../pages/payment/PaymentSuccess";
import PaymentFailure from "../pages/payment/PaymentFailure";
import OrderHistory from "../pages/user/OrderHistory";

const Main = () => (
  <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home-page-2" element={<Home2 />} />
      <Route path="/listing" element={<Listing />} />
      <Route path="/listing-grid" element={<ListingGrid />} />
      <Route path="/page-content" element={<SimplePage />} />
      <Route path="/product-detail/:productId" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/shopping-cart" element={<Cart />} />
      <Route path="/category" element={<Category />} />
      <Route path="/category/:categoryId" element={<Listing />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile-orders" element={<OrderHistory />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-failure" element={<PaymentFailure />} />
    </Routes>
  </main>
);
export default Main;
