import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CartProvider from './context/CartContext.jsx'
import AuthProvider from './context/AuthContext.jsx'
import WishListProvider from './context/wishList.jsx'
import MenuProvider from './context/MenuContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <WishListProvider>
            <MenuProvider>
              <App />
            </MenuProvider>
          </WishListProvider>
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
