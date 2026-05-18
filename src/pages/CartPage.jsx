import { Link } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/Header.jsx'
import { useCart } from '../contexts/CartContext.jsx'
import NavMobileBottom from '../components/NavMobileBottom.jsx'
import './CartPage.css'

function fmt(v) {
  return `R$ ${v.toFixed(2).replace('.', ',')}`
}

const FARMACIAS = [
  { id: 1, nome: 'Pague Menos', local: 'Fortaleza, CE', logo: '/img/farmacias/paguemenos.png' },
  { id: 2, nome: 'Drogasil',    local: 'Fortaleza, CE', logo: null },
]

export default function CartPage() {
  const { cartItems, alterarQtd, removerItem, entregaValores, setEntrega, totalItens } = useCart()

  const [selectedItems, setSelectedItems] = useState(() =>
    Object.fromEntries(cartItems.map(i => [i.id, true]))
  )

  function toggleItem(id) {
    setSelectedItems(prev => ({ ...prev, [id]: !prev[id] }))
  }

  function toggleAll(farmItems) {
    const allSelected = farmItems.every(i => selectedItems[i.id] !== false)
    const update = {}
    farmItems.forEach(i => { update[i.id] = !allSelected })
    setSelectedItems(prev => ({ ...prev, ...update }))
  }

  const itemsByFarmacia = FARMACIAS.map(farm => ({
    ...farm,
    items: cartItems.filter(i => i.farmacia === farm.id),
  })).filter(f => f.items.length > 0)

  const isEmpty = cartItems.length === 0

  const selectedCartItems    = cartItems.filter(i => selectedItems[i.id] !== false)
  const selectedTotalItens   = selectedCartItems.reduce((s, i) => s + i.qtd, 0)
  const selectedSubtotal     = selectedCartItems.reduce((s, i) => s + i.preco * i.qtd, 0)
  const selectedDescontos    = selectedCartItems.reduce((s, i) => s + (i.precoOriginal ? (i.precoOriginal - i.preco) * i.qtd : 0), 0)
  const farmaciasComSel      = new Set(selectedCartItems.map(i => i.farmacia))
  const selectedEntregaTotal = Object.entries(entregaValores)
    .filter(([id]) => farmaciasComSel.has(Number(id)))
    .reduce((s, [, v]) => s + v, 0)
  const selectedTotal = selectedSubtotal + selectedEntregaTotal

  const ResumoConteudo = () => (
    <>
      <p className="cp-resumo-titulo">Resumo do pedido</p>
      <div className="cp-resumo-body">
        <div className="cp-resumo-row">
          <span>Subtotal ({selectedTotalItens} {selectedTotalItens === 1 ? 'item' : 'itens'})</span>
          <span>{fmt(selectedSubtotal)}</span>
        </div>
        {selectedDescontos > 0 && (
          <div className="cp-resumo-row cp-desconto">
            <span>Descontos</span>
            <span>- {fmt(selectedDescontos)}</span>
          </div>
        )}
        <div className="cp-resumo-row">
          <span>Entrega</span>
          <span>{selectedEntregaTotal === 0 ? 'Gratis' : fmt(selectedEntregaTotal)}</span>
        </div>
        <hr className="cp-resumo-divider" />
        <div className="cp-resumo-row cp-total">
          <strong>Total</strong>
          <strong>{fmt(selectedTotal)}</strong>
        </div>
        {selectedTotalItens > 0 && (
          <p className="cp-parcelado">Em <strong>6x de {fmt(selectedTotal / 6)}</strong> sem juros</p>
        )}
      </div>
      <div className="cp-resumo-footer">
        {selectedTotalItens === 0 && (
          <p className="cp-aviso">Selecione ao menos um produto</p>
        )}
        <Link to="/checkout" style={{ display: 'block' }}>
          <button className="cp-btn-checkout" disabled={selectedTotalItens === 0}>
            <span className="material-symbols-outlined">lock</span>
            Finalizar compra
          </button>
        </Link>
      </div>
    </>
  )

  if (isEmpty) {
    return (
      <>
        <Header showBack />
        <div className="cp-vazio">
          <span className="material-symbols-outlined">shopping_cart</span>
          <h2>Seu carrinho esta vazio</h2>
          <p>Adicione produtos para continuar</p>
          <Link to="/" className="cp-btn-home">Explorar produtos</Link>
        </div>
        <NavMobileBottom />
      </>
    )
  }

  return (
    <>
      <Header showBack />

      <div className="cp-layout">
        <h1 className="cp-titulo">
          Meu Carrinho
          <span className="cp-badge">{totalItens} {totalItens === 1 ? 'item' : 'itens'}</span>
        </h1>

        <div className="cp-items-col">
          {itemsByFarmacia.map((farm, fIdx) => {
            const allSelected  = farm.items.every(i => selectedItems[i.id] !== false)
            const someSelected = farm.items.some(i => selectedItems[i.id] !== false)

            return (
              <div key={farm.id}>
                {fIdx > 0 && <div className="cp-sep">outro pedido</div>}

                <div className="cp-card cp-grupo">
                  <div className="cp-farm-header">
                    <label className="cp-check-label">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        ref={el => { if (el) el.indeterminate = someSelected && !allSelected }}
                        onChange={() => toggleAll(farm.items)}
                      />
                      <span className="cp-check-box" />
                    </label>
                    {farm.logo
                      ? <img className="cp-farm-logo" src={farm.logo} alt={farm.nome} />
                      : <div className="cp-farm-logo cp-farm-logo-fallback">{farm.nome.charAt(0)}</div>
                    }
                    <div>
                      <p className="cp-farm-nome">{farm.nome}</p>
                      <p className="cp-farm-loc">
                        <span className="material-symbols-outlined">location_on</span>
                        {farm.local}
                      </p>
                    </div>
                  </div>

                  {farm.items.map(item => {
                    const isSelected = selectedItems[item.id] !== false
                    return (
                      <div key={item.id} className={`cp-item${!isSelected ? ' cp-desmarcado' : ''}`}>
                        <label className="cp-check-label cp-check-item">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleItem(item.id)}
                          />
                          <span className="cp-check-box" />
                        </label>

                        <img className="cp-img" src={item.img} alt={item.nome} />

                        <div className="cp-info">
                          <p className="cp-marca">{item.marca}</p>
                          <p className="cp-nome">{item.nome}</p>
                          <p className="cp-dosagem">{item.dosagem}</p>
                          <div className="cp-bottom">
                            <div className="cp-preco-wrap">
                              {item.precoOriginal && <del className="cp-preco-orig">{fmt(item.precoOriginal)}</del>}
                              <strong className="cp-preco">{fmt(item.preco * item.qtd)}</strong>
                              {item.precoOriginal && (
                                <span className="cp-off">
                                  {Math.round((1 - item.preco / item.precoOriginal) * 100)}% OFF
                                </span>
                              )}
                            </div>
                            <div className="cp-acoes">
                              <div className="cp-qtd">
                                <button onClick={() => alterarQtd(item.id, -1)}>-</button>
                                <span>{item.qtd}</span>
                                <button onClick={() => alterarQtd(item.id, 1)}>+</button>
                              </div>
                              <button className="cp-del" onClick={() => removerItem(item.id)}>
                                <span className="material-symbols-outlined">delete</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  <div className="cp-entrega">
                    <p className="cp-entrega-label">Entrega</p>
                    <div className="cp-entrega-opts">
                      {[
                        { valor: 5.90, icon: 'local_shipping', titulo: 'Entrega rapida',       sub: 'Receba hoje ate 18h',   preco: 'R$ 5,90', pago: true },
                        { valor: 0,    icon: 'storefront',      titulo: 'Retirada na farmacia', sub: 'Disponivel em 30 min', preco: 'Gratis',  pago: false },
                      ].map(op => (
                        <label
                          key={op.valor}
                          className={`cp-entrega-opt${entregaValores[farm.id] === op.valor ? ' ativo' : ''}`}
                          onClick={() => setEntrega(farm.id, op.valor)}
                        >
                          <input type="radio" name={`entrega${farm.id}`} readOnly checked={entregaValores[farm.id] === op.valor} />
                          <div className="cp-radio-dot" />
                          <span className="material-symbols-outlined cp-entrega-icon">{op.icon}</span>
                          <div className="cp-entrega-texto">
                            <p className="cp-entrega-titulo">{op.titulo}</p>
                            <p className="cp-entrega-sub">{op.sub}</p>
                          </div>
                          <span className={`cp-entrega-preco${op.pago ? ' pago' : ''}`}>{op.preco}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Resumo desktop - dentro do grid */}
        <aside className="cp-resumo-desktop">
          <div className="cp-card cp-resumo-card">
            <ResumoConteudo />
          </div>
        </aside>
      </div>

      {/* Resumo mobile - FORA do grid, fixo no bottom */}
      <div className="cp-resumo-mobile">
        <ResumoConteudo />
      </div>

      <NavMobileBottom />
    </>
  )
}
