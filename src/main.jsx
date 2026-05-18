import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { CepProvider } from './contexts/CepContext.jsx'
import { NotificacoesProvider } from './contexts/NotificacoesContext.jsx'
import { FavoritosProvider } from './contexts/FavoritosContext.jsx'
import './styles/all.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CepProvider>
        <CartProvider>
          <FavoritosProvider>
            <NotificacoesProvider>
              <App />
            </NotificacoesProvider>
          </FavoritosProvider>
        </CartProvider>
      </CepProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
