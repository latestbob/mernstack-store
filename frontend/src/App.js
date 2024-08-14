import React from 'react';

import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from './components/Nav';
import Home from './pages/Home';
import Footer from './components/Footer';
import ProductDetails from './pages/ProductDetails';
import { CartContextProvider } from './contexts/cartContext';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderComplete from './pages/OrderComplete';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
      <>


<BrowserRouter>

    <CartContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-complete" element={<OrderComplete />} />
      </Routes>
      <Footer />
      <ToastContainer />
  </CartContextProvider>
</BrowserRouter>
      
      </>
  );
}

export default App;
