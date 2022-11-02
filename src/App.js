import React, { useEffect, useState } from 'react'
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart, Checkout } from './components';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import { get } from 'lodash';

//https://dashboard.chec.io/products/
//https://commercejs.com/docs/sdk/cart#refresh-cart
//424242................ is the dummy credit card number.
//https://zlipkart-e-commerce.netlify.app/

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('')

  const total_items = get(cart, 'total_items');

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data)
  }

  const fetchCart = async () => {
    const initialCart = await commerce.cart.retrieve();
    setCart(initialCart);
  }

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item);
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const item = await commerce.cart.update(productId, { quantity });
    setCart(item);
  }

  const handleRemoveFromCart = async (productId) => {
    const res = await commerce.cart.remove(productId);
    setCart(res);
  }

  const handleEmptyCart = async () => {
    const item = await commerce.cart.empty();
    setCart(item);
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      console.log('dddd')
      setOrder(incomingOrder);
      refreshCart();
    } catch (e) {
      setErrorMessage(get(e, 'data.error.message'))
      refreshCart();

    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar totalItems={total_items} />
        <Routes>
          <Route exact path="/" element={<Products products={products} handleAddToCart={handleAddToCart} />} />
          <Route exact path="/cart" element={<Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart} />} />
          <Route exact path="/checkout" element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App