import { useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Categaoryporduct from './pages/CategoryPage'
import ProductsPage from './pages/ProductsPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import Loginpage from './pages/LoginPage'
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
        <Route path='/login' element={<Loginpage />} />
        <Route path='/wishlist' element={<WishListPage />} />
        <Route path='/category-page/:category_id' element={<Categaoryporduct />} />
        <Route path='/product-page/:p_id' element={<ProductPage />} />
      </Routes>
    </>
  )
}

export default App
