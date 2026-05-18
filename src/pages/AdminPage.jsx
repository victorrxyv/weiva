import { useState } from 'react'
import { Link } from 'react-router-dom'

const NAV_ITEMS = [
  { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
  { id: 'produtos', icon: 'inventory_2', label: 'Produtos', chip: '3' },
  { id: 'pedidos', icon: 'receipt_long', label: 'Pedidos', chip: '14' },
  { id: 'perfil', icon: 'manage_accounts', label: 'Perfil da farmácia' },
]

const PRODUTOS_ADMIN = [
  { nome: 'Dipirona 500mg', categoria: 'Medicamento', preco: 'R$ 8,90', estoque: 24 },
  { nome: 'Tadalafila 20mg', categoria: 'Medicamento', preco: 'R$ 14,50', estoque: 67 },
  { nome: 'Vitamina C 1g', categoria: 'Suplemento', preco: 'R$ 22,90', estoque: 69 },
]

const PEDIDOS_ADMIN = [
  { num: '#10235', cliente: 'Maria Fernanda', itens: '1 item', valor: 'R$ 22,90', hora: '11:42', status: 'entregue' },
  { num: '#10234', cliente: 'João Silva', itens: '2 itens', valor: 'R$ 31,80', hora: '11:08', status: 'entregue' },
  { num: '#10233', cliente: 'Ana Rodrigues', itens: '3 itens', valor: 'R$ 67,70', hora: '09:45', status: 'pendente' },
]

export default function AdminPage() {
  const [secao, setSecao] = useState('dashboard')
  const [busca, setBusca] = useState('')

  const produtosFiltrados = PRODUTOS_ADMIN.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <img src="/img/weiva/icon.png" alt="Weiva" />
          <div>
            <p className="brand-name">Weiva Admin</p>
            <p className="brand-sub">Pague Menos</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-label">Principal</p>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-item ${secao === item.id ? 'ativo' : ''}`}
              onClick={() => setSecao(item.id)}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
              {item.chip && <span className="nav-chip">{item.chip}</span>}
            </button>
          ))}

          <p className="nav-label" style={{ marginTop: 16 }}>Conta</p>
          <Link to="/" className="nav-item sair" style={{ textDecoration: 'none' }}>
            <span className="material-symbols-outlined">logout</span>
            Sair
          </Link>
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="admin-conteudo">

        {/* DASHBOARD */}
        {secao === 'dashboard' && (
          <section className="secao ativa">
            <div className="page-header">
              <div>
                <h1>Dashboard</h1>
                <p className="page-sub">Visão geral de hoje</p>
              </div>
            </div>

            <div className="cards-dashboard">
              <div className="stat-card s-red">
                <div className="stat-icon-row">
                  <div className="stat-icon"><span className="material-symbols-outlined">payments</span></div>
                </div>
                <p className="stat-label">Receita hoje</p>
                <p className="stat-value">R$ 1.240</p>
              </div>
              <div className="stat-card s-blue">
                <div className="stat-icon-row">
                  <div className="stat-icon"><span className="material-symbols-outlined">receipt_long</span></div>
                </div>
                <p className="stat-label">Pedidos hoje</p>
                <p className="stat-value">14</p>
              </div>
              <div className="stat-card s-green">
                <div className="stat-icon-row">
                  <div className="stat-icon"><span className="material-symbols-outlined">people</span></div>
                </div>
                <p className="stat-label">Novos clientes</p>
                <p className="stat-value">3</p>
              </div>
            </div>

            <p className="s-heading">Últimos pedidos</p>
            <div className="lista-pedidos-admin">
              {PEDIDOS_ADMIN.map(p => (
                <div key={p.num} className="pedido-card-admin">
                  <div className="pedido-num">{p.num}</div>
                  <div className="pedido-info">
                    <div className="pedido-titulo">{p.cliente}</div>
                    <div className="pedido-sub">{p.itens} · {p.valor} · {p.hora}</div>
                  </div>
                  <span className={`badge ${p.status === 'entregue' ? 'badge-entregue' : 'badge-pendente'}`}>
                    {p.status === 'entregue' ? 'Entregue' : 'Pendente'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PRODUTOS */}
        {secao === 'produtos' && (
          <section className="secao ativa">
            <div className="page-header">
              <div>
                <h1>Produtos</h1>
                <p className="page-sub">{PRODUTOS_ADMIN.length} produtos cadastrados</p>
              </div>
              <button className="btn-primary">
                <span className="material-symbols-outlined">add</span>
                Adicionar produto
              </button>
            </div>

            <div className="table-wrap">
              <div className="table-toolbar">
                <span className="table-toolbar-title">Catálogo de produtos</span>
                <div className="search-wrap">
                  <span className="material-symbols-outlined">search</span>
                  <input
                    className="search-input" type="text"
                    placeholder="Buscar produto..."
                    value={busca} onChange={e => setBusca(e.target.value)}
                  />
                </div>
              </div>

              {produtosFiltrados.length === 0 ? (
                <p className="sem-resultado">Nenhum produto encontrado.</p>
              ) : (
                <table className="tabela">
                  <thead>
                    <tr>
                      <th>Nome</th><th>Categoria</th>
                      <th>Preço</th><th>Estoque</th><th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtosFiltrados.map((p, i) => (
                      <tr key={i}>
                        <td className="td-name">{p.nome}</td>
                        <td><span className="tag">{p.categoria}</span></td>
                        <td>{p.preco}</td>
                        <td>{p.estoque}</td>
                        <td>
                          <button className="btn-icon"><span className="material-symbols-outlined">edit</span></button>
                          <button className="btn-icon deletar"><span className="material-symbols-outlined">block</span></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        )}

        {/* PEDIDOS */}
        {secao === 'pedidos' && (
          <section className="secao ativa">
            <div className="page-header">
              <div>
                <h1>Pedidos</h1>
                <p className="page-sub">14 pedidos ativos hoje</p>
              </div>
            </div>
            <div className="lista-pedidos-admin">
              {PEDIDOS_ADMIN.map(p => (
                <div key={p.num} className="pedido-card-admin">
                  <div className="pedido-num">{p.num}</div>
                  <div className="pedido-info">
                    <div className="pedido-titulo">{p.cliente}</div>
                    <div className="pedido-sub">{p.itens} · {p.valor} · {p.hora}</div>
                  </div>
                  <span className={`badge ${p.status === 'entregue' ? 'badge-entregue' : 'badge-pendente'}`}>
                    {p.status === 'entregue' ? 'Entregue' : 'Pendente'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PERFIL */}
        {secao === 'perfil' && (
          <section className="secao ativa">
            <div className="page-header">
              <div><h1>Perfil da farmácia</h1></div>
            </div>
            <form className="form-perfil-admin" onSubmit={e => { e.preventDefault(); alert('Salvo!') }}>
              {[
                { label: 'Nome da farmácia', placeholder: 'Pague Menos' },
                { label: 'CNPJ', placeholder: '00.000.000/0001-00' },
                { label: 'Telefone', placeholder: '(85) 3456-7890' },
                { label: 'Endereço', placeholder: 'Av. Bezerra de Menezes, 1234' },
              ].map((f, i) => (
                <div className="form-group-admin" key={i}>
                  <label>{f.label}</label>
                  <input type="text" placeholder={f.placeholder} />
                </div>
              ))}
              <div className="btn-form-admin">
                <button className="btn-primary" type="submit">
                  <span className="material-symbols-outlined">save</span>
                  Salvar
                </button>
                <button className="btn-descartar-admin" type="button">Descartar</button>
              </div>
            </form>
          </section>
        )}
      </main>
    </div>
  )
}
