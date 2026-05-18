import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/Header.jsx'
import ProductCard from '../components/ProductCard.jsx'
import NavMobileBottom from '../components/NavMobileBottom.jsx'

const CHIPS = [
  { id: 'todos',        label: 'Todos',        icon: 'dashboard' },
  { id: 'analgésicos',  label: 'Analgésicos',  icon: 'medication' },
  { id: 'antibióticos', label: 'Antibióticos', icon: 'vaccines' },
  { id: 'vitaminas',    label: 'Vitaminas',    icon: 'nutrition' },
  { id: 'cosméticos',   label: 'Cosméticos',   icon: 'face' },
  { id: 'higiene',      label: 'Higiene',      icon: 'sanitizer' },
  { id: 'bebê',         label: 'Bebê',         icon: 'child_care' },
]

const ORDENAR = ['Mais relevantes', 'Menor preço', 'Maior preço', 'Mais vendidos']

const FARMACIAS = [
  { id: 'pague-menos', label: 'Pague Menos' },
  { id: 'drogasil',    label: 'Drogasil' },
  { id: 'droga-raia',  label: 'Droga Raia' },
  { id: 'ultrafarma',  label: 'Ultrafarma' },
  { id: 'panvel',      label: 'Panvel' },
  { id: 'nissei',      label: 'Nissei' },
]

const IMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAk-HADJGkID3Pu51cerTLpBlqx16ecxfaEg&s'

const PRODUTOS = Array.from({ length: 48 }, (_, i) => ({
  id: i + 1, img: IMG,
  marca: 'Genérico',
  nome: 'Medicamento Genérico Nome Longo Que Pode Quebrar',
  dosagem: 'c/ 24 cápsulas',
  farmacia: 'Pague Menos',
  preco: 18.30,
  precoOriginal: i % 2 === 0 ? 22.90 : null,
}))

export default function CategoriaPage() {
  const [searchParams] = useSearchParams()
  const catParam = searchParams.get('cat') || 'todos'
  const [chipAtivo, setChipAtivo]         = useState(catParam)
  const [busca, setBusca]                 = useState('')
  const [ordenar, setOrdenar]             = useState('Mais relevantes')
  const [filtroAberto, setFiltroAberto]   = useState(false)
  const [tipoFiltro, setTipoFiltro]       = useState('Todos')
  const [formaFiltro, setFormaFiltro]     = useState('Todos')
  const [farmaciasFiltro, setFarmaciasFiltro] = useState([])
  const [precoFiltro, setPrecoFiltro]     = useState('Todos')
  const [apenasDesconto, setApenasDesconto] = useState(false)
  const navigate = useNavigate()

  const toggleFarmacia = (id) => {
    setFarmaciasFiltro(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const produtosFiltrados = PRODUTOS.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  )

  const temFiltroAtivo = tipoFiltro !== 'Todos' || formaFiltro !== 'Todos' || farmaciasFiltro.length > 0 || precoFiltro !== 'Todos' || apenasDesconto

  const limparFiltros = () => {
    setTipoFiltro('Todos')
    setFormaFiltro('Todos')
    setFarmaciasFiltro([])
    setPrecoFiltro('Todos')
    setApenasDesconto(false)
  }

  return (
    <>
      <Header showBack />

      <div className="cat-page">

        {/* CHIPS */}
        <div className="cat-chips-bar">
          {CHIPS.map(c => (
            <button
              key={c.id}
              className={`cat-chip ${chipAtivo === c.id ? 'ativo' : ''}`}
              onClick={() => { setChipAtivo(c.id); navigate(`/categoria?cat=${c.id}`) }}
            >
              <span className="material-symbols-outlined">{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>

        {/* TOOLBAR */}
        <div className="cat-toolbar">
          <p className="cat-count">
            <span>{produtosFiltrados.length}</span> produtos encontrados
          </p>
          {/* Em mobile, os controles ficam na linha de baixo */}
          <div className="cat-toolbar-right">
            <button className="btn-filtro" onClick={() => setFiltroAberto(true)}>
              <span className="material-symbols-outlined">tune</span>
              Filtros
              {temFiltroAtivo && (
                <span className="filtro-badge">!</span>
              )}
            </button>
            <select className="select-ordenar" value={ordenar} onChange={e => setOrdenar(e.target.value)}>
              {ORDENAR.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        {/* GRID */}
        <div className="cat-grid">
          {produtosFiltrados.map(p => (
            <ProductCard key={p.id} {...p} to="/produto" />
          ))}
          {produtosFiltrados.length === 0 && (
            <div className="cat-vazio">
              <span className="material-symbols-outlined">search_off</span>
              <p>Nenhum produto encontrado</p>
            </div>
          )}
        </div>
      </div>

      {/* DRAWER FILTROS */}
      {filtroAberto && (
        <div className="filtro-overlay" onClick={() => setFiltroAberto(false)}>
          <div className="filtro-drawer" onClick={e => e.stopPropagation()}>
            <div className="filtro-header">
              <h3>Filtros</h3>
              <button onClick={() => setFiltroAberto(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* FARMÁCIAS */}
            <div className="filtro-secao">
              <h4>Farmácias</h4>
              <div className="filtro-farmacias-grid">
                {FARMACIAS.map(f => (
                  <label
                    key={f.id}
                    className={`filtro-farmacia-chip ${farmaciasFiltro.includes(f.id) ? 'ativo' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={farmaciasFiltro.includes(f.id)}
                      onChange={() => toggleFarmacia(f.id)}
                    />
                    {f.label}
                  </label>
                ))}
              </div>
            </div>

            {/* DESCONTO */}
            <div className="filtro-secao">
              <label className="filtro-desconto-toggle">
                <span className="filtro-desconto-texto">
                  <span className="material-symbols-outlined">local_offer</span>
                  Somente com desconto
                </span>
                <div
                  className={`toggle-switch ${apenasDesconto ? 'ativo' : ''}`}
                  onClick={() => setApenasDesconto(!apenasDesconto)}
                >
                  <div className="toggle-knob" />
                </div>
              </label>
            </div>

            {/* FAIXA DE PREÇO */}
            <div className="filtro-secao">
              <h4>Faixa de preço</h4>
              {['Todos', 'Até R$ 20', 'R$ 20 – R$ 50', 'R$ 50 – R$ 100', 'Acima de R$ 100'].map(p => (
                <label key={p} className={`filtro-label ${precoFiltro === p ? 'ativo' : ''}`}>
                  <input
                    type="radio" name="preco"
                    checked={precoFiltro === p}
                    onChange={() => setPrecoFiltro(p)}
                  />
                  {p}
                </label>
              ))}
            </div>

            {/* TIPO DE MEDICAMENTO */}
            <div className="filtro-secao">
              <h4>Tipo de medicamento</h4>
              {['Todos', 'Genérico', 'Similar', 'Referência'].map(t => (
                <label key={t} className={`filtro-label ${tipoFiltro === t ? 'ativo' : ''}`}>
                  <input
                    type="radio" name="tipo"
                    checked={tipoFiltro === t}
                    onChange={() => setTipoFiltro(t)}
                  />
                  {t}
                </label>
              ))}
            </div>

            {/* FORMA FARMACÊUTICA */}
            <div className="filtro-secao">
              <h4>Forma farmacêutica</h4>
              {['Todos', 'Comprimido', 'Cápsula', 'Líquido', 'Pomada', 'Injetável'].map(f => (
                <label key={f} className={`filtro-label ${formaFiltro === f ? 'ativo' : ''}`}>
                  <input
                    type="radio" name="forma"
                    checked={formaFiltro === f}
                    onChange={() => setFormaFiltro(f)}
                  />
                  {f}
                </label>
              ))}
            </div>

            <div className="filtro-acoes">
              <button className="filtro-limpar" onClick={limparFiltros}>
                Limpar filtros
              </button>
              <button className="filtro-aplicar" onClick={() => setFiltroAberto(false)}>
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}

      <NavMobileBottom />
    </>
  )
}
