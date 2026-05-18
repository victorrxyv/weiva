import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/',         icon: 'home',           label: 'Início'    },
  { to: '/categoria', icon: 'dashboard',     label: 'Categoria' },
  { to: '/ofertas',  icon: 'shoppingmode',   label: 'Ofertas'   },
  { to: '/carrinho', icon: 'shopping_cart',  label: 'Carrinho'  },
  { to: '/perfil',   icon: 'account_circle', label: 'Conta'     },
]

export default function NavMobileBottom() {
  const { pathname } = useLocation()

  function isAtivo(to) {
    if (to === '/') return pathname === '/'
    return pathname.startsWith(to)
  }

  return (
    <nav className="nav-mobile-bottom">
      {NAV_ITEMS.map(({ to, icon, label }) => (
        <Link key={to} to={to} className={isAtivo(to) ? 'nav-ativo' : ''}>
          <span className="material-symbols-outlined">{icon}</span>
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  )
}
