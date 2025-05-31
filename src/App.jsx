import { useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Categoryporduct from './pages/CategoryPage'
import ProductsPage from './pages/ProductsPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import WishListPage from './pages/WishlistPage'
import PrivateRoute from './routes/PrivateRoute'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/cart' element={
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        } />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/wishlist' element={
          <PrivateRoute>
            <WishListPage />
          </PrivateRoute>
        } />
        <Route path='/category-page/:category_id' element={<Categoryporduct />} />
        <Route path='/product-page/:p_id' element={<ProductPage />} />
      </Routes>
    </>
  )
}

export default App
