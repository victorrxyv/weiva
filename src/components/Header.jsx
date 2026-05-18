import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext.jsx'
import { useCep } from '../contexts/CepContext.jsx'
import { useNotificacoes } from '../contexts/NotificacoesContext.jsx'
import CepModal from './CepModal.jsx'

const CATEGORIAS = [
  { id: 'saude', label: 'Serviços de saúde' },
  { id: 'medicamentos', label: 'Medicamentos e Saúde' },
  { id: 'vida', label: 'Vida Saudável' },
  { id: 'bebe', label: 'Bebê e Infantil' },
  { id: 'beleza', label: 'Dermo e Beleza' },
  { id: 'higiene', label: 'Higiene Pessoal' },
  { id: 'cosmeticos', label: 'Cosméticos' },
  { id: 'vitaminas', label: 'Vitaminas e Suplementos' },
]

export default function Header({ showBack = false }) {
  const [menuAberto, setMenuAberto] = useState(false)
  const [catAtiva, setCatAtiva] = useState('todos')
  const { totalItens } = useCart()
  const { cidadeCep, abrirModal } = useCep()
  const { naoLidas } = useNotificacoes()
  const navigate = useNavigate()

  function toggleMenu() { setMenuAberto(v => !v) }
  function closeMenu() { setMenuAberto(false) }

  return (
    <>
      <CepModal />
      <div className={`overlay ${menuAberto ? 'active' : ''}`} onClick={closeMenu} />

      {/* MOBILE HOME */}
      {!showBack && (
        <header className="header-mobile-home">
          <div className="hm-top">
            <button className="hm-hamburger" onClick={toggleMenu}>
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="hm-search">
              <span className="material-symbols-outlined">search</span>
              <input type="text" placeholder="Buscar por medicamentos ou farmácias" />
            </div>
            <Link to="/notificacoes" className="hm-cart hm-notif-btn">
              <span className="material-symbols-outlined">notifications_active</span>
              {naoLidas > 0 && <span className="notif-badge">{naoLidas}</span>}
            </Link>
          </div>
          <button className="hm-cep-btn" onClick={abrirModal}>
            <span className="material-symbols-outlined">location_on</span>
            <span>{cidadeCep}</span>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </header>
      )}

      {/* MOBILE INNER */}
      {showBack && (
        <header className="header-mobile-inner">
          <button className="hmi-back" onClick={() => navigate(-1)}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="hmi-search">
            <span className="material-symbols-outlined">search</span>
            <input type="text" placeholder="Buscar por medicamentos ou farmácias" />
          </div>
          <Link to="/notificacoes" className="hmi-notif-btn">
            <span className="material-symbols-outlined">notifications_active</span>
            {naoLidas > 0 && <span className="notif-badge">{naoLidas}</span>}
          </Link>
        </header>
      )}

      {/* DESKTOP */}
      <header className="header-desk">
        <div className="top-header">
          {showBack ? (
            <button className="back-desk" onClick={() => navigate(-1)}>
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          ) : (
            <div className="hamburger" onClick={toggleMenu}>
              <span className="material-symbols-outlined">menu</span>
            </div>
          )}
          <div className="logo">
            <Link to="/"><img src="/img/weiva/logo.png" alt="Logo Weiva" /></Link>
          </div>
          <button className="desk-cep-btn" onClick={abrirModal}>
            <span className="material-symbols-outlined">location_on</span>
            <span className="cep-text">{cidadeCep}</span>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
          <div className="search-bar">
            <span className="material-symbols-outlined">search</span>
            <input type="text" placeholder="Buscar por medicamentos ou farmácias" />
          </div>
          <div className="actions">
            <Link to="/carrinho">
              <button className="btn-action" style={{ position: 'relative' }}>
                <span className="material-symbols-outlined">shopping_cart</span>
                {totalItens > 0 && <span className="cart-badge">{totalItens}</span>}
              </button>
            </Link>
            <Link to="/perfil">
              <button className="btn-action">
                <span className="material-symbols-outlined">account_circle</span>
                Entrar
              </button>
            </Link>
          </div>
        </div>
        <nav className="nav-bar">
          <div className="btn-nav-wrapper">
            <button className="btn-nav">
              <span className="material-symbols-outlined">segment</span>
              Categorias
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </button>
            <div className="dropdown-categorias">
              <div className="dropdown-left">
                <div className={`cat-item ${catAtiva === 'todos' ? 'active' : ''}`} onMouseEnter={() => setCatAtiva('todos')} onClick={() => navigate('/categoria')}>
                  Todos<span className="material-symbols-outlined cat-arrow">chevron_right</span>
                </div>
                {CATEGORIAS.map(cat => (
                  <div key={cat.id} className={`cat-item ${catAtiva === cat.id ? 'active' : ''}`} onMouseEnter={() => setCatAtiva(cat.id)} onClick={() => navigate(`/categoria?cat=${cat.id}`)}>
                    {cat.label}<span className="material-symbols-outlined cat-arrow">chevron_right</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Link to="/categoria?cat=medicamentos">Medicamentos</Link>
          <Link to="/categoria?cat=cosmeticos">Cosméticos</Link>
          <Link to="/categoria?cat=vitaminas">Vitaminas</Link>
          <Link to="/farmacia"><span className="material-symbols-outlined">store</span> Farmácias</Link>
          <Link to="/perfil"><span className="material-symbols-outlined">bookmark</span> Favoritos</Link>
          <Link to="/notificacoes" style={{ position: 'relative' }}>
            <span className="material-symbols-outlined">notifications_active</span> Notificações
            {naoLidas > 0 && <span className="notif-badge-nav">{naoLidas}</span>}
          </Link>
        </nav>
      </header>

      {/* DRAWER MOBILE */}
      <nav className={`mobile-menu ${menuAberto ? 'active' : ''}`}>
        <div className="menu-header">
          <img src="/img/weiva/default-avatar.jpg" alt="avatar" />
          <Link to="/login" onClick={closeMenu}>Fazer Login <span className="material-symbols-outlined">arrow_right</span></Link>
        </div>
        <div className="menu-nav">
          <ul>
            <li><Link to="/perfil" onClick={closeMenu}><span className="material-symbols-outlined">account_circle</span> Minha conta</Link></li>
            <li>
              <Link to="/notificacoes" onClick={closeMenu}>
                <span className="material-symbols-outlined">notifications_active</span> Notificações
                {naoLidas > 0 && <span className="notif-badge-menu">{naoLidas}</span>}
              </Link>
            </li>
            <li><Link to="/categoria?cat=ofertas" onClick={closeMenu}><span className="material-symbols-outlined">shoppingmode</span> Ofertas do dia</Link></li>
            <li><Link to="/perfil" onClick={closeMenu}><span className="material-symbols-outlined">shopping_bag</span> Minhas Compras</Link></li>
            <li><Link to="/perfil" onClick={closeMenu}><span className="material-symbols-outlined">bookmark</span> Favoritos</Link></li>
            <li><Link to="/farmacia" onClick={closeMenu}><span className="material-symbols-outlined">store</span> Farmácias</Link></li>
            <li><Link to="/categoria" onClick={closeMenu}><span className="material-symbols-outlined">shopping_bag_speed</span> Mais vendidos</Link></li>
            <hr />
            <li><a href="#"><span className="material-symbols-outlined">info</span> Sobre</a></li>
            <li><a href="#"><span className="material-symbols-outlined">chat</span> Contato</a></li>
            <li><a href="#"><span className="material-symbols-outlined">reviews</span> Feedback</a></li>
          </ul>
        </div>
      </nav>
    </>
  )
}
