import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CategoriaPage from './pages/CategoriaPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import UsuarioPage from './pages/UsuarioPage.jsx'
import FarmaciaPage from './pages/FarmaciaPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import NotificacoesPage from './pages/NotificacoesPage.jsx'
import ParceiroBeneficiosPage from './pages/ParceiroBeneficiosPage.jsx'
import ParceiroCadastroPage from './pages/ParceiroCadastroPage.jsx'
import ProductPage from './pages/ProductPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/carrinho" element={<CartPage />} />
      <Route path="/categoria" element={<CategoriaPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/perfil" element={<UsuarioPage />} />
      <Route path="/farmacia" element={<FarmaciaPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/notificacoes" element={<NotificacoesPage />} />
      <Route path="/produto" element={<ProductPage />} />
      <Route path="/parceiro" element={<ParceiroBeneficiosPage />} />
      <Route path="/parceiro/cadastro" element={<ParceiroCadastroPage />} />
    </Routes>
  )
}

export default App
