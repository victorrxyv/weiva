import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../contexts/CartContext.jsx'

const NAV_ITEMS = [
  { to: '/',         icon: 'home',           label: 'Início'   },
  { to: '/categoria', icon: 'dashboard',     label: 'Categoria' },
  { to: '/ofertas',  icon: 'shoppingmode',   label: 'Ofertas'  },
  { to: '/carrinho', icon: 'shopping_cart',  label: 'Carrinho', badge: true },
  { to: '/perfil',   icon: 'account_circle', label: 'Conta'    },
]

export default function NavMobileBottom() {
  const { pathname } = useLocation()
  const { totalItens } = useCart()

  function isAtivo(to) {
    if (to === '/') return pathname === '/'
    return pathname.startsWith(to)
  }

  return (
    <nav className="nav-mobile-bottom">
      {NAV_ITEMS.map(({ to, icon, label, badge }) => (
        <Link key={to} to={to} className={isAtivo(to) ? 'nav-ativo' : ''}>
          <span className="nav-icon-wrap">
            <span className="material-symbols-outlined">{icon}</span>
            {badge && totalItens > 0 && (
              <span className="nav-badge">{totalItens > 99 ? '99+' : totalItens}</span>
            )}
          </span>
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  )
}
