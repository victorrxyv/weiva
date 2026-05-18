import { Link } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/Header.jsx'
import { useCart } from '../contexts/CartContext.jsx'
import NavMobileBottom from '../components/NavMobileBottom.jsx'

function fmt(v) {
  return `R$ ${v.toFixed(2).replace('.', ',')}`
}

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

  const farmacias = [
    { id: 1, nome: 'Pague Menos', local: 'Fortaleza, CE' },
    { id: 2, nome: 'Drogasil', local: 'Fortaleza, CE' },
  ]

  const itemsByFarmacia = farmacias.map(farm => ({
    ...farm,
    items: cartItems.filter(i => i.farmacia === farm.id),
  })).filter(f => f.items.length > 0)

  const isEmpty = cartItems.length === 0

  const selectedCartItems = cartItems.filter(i => selectedItems[i.id] !== false)
  const selectedTotalItens = selectedCartItems.reduce((s, i) => s + i.qtd, 0)
  const selectedSubtotal = selectedCartItems.reduce((s, i) => s + i.preco * i.qtd, 0)
  const selectedDescontos = selectedCartItems.reduce((s, i) => s + (i.precoOriginal ? (i.precoOriginal - i.preco) * i.qtd : 0), 0)
  const farmaciasComSelecionados = new Set(selectedCartItems.map(i => i.farmacia))
  const selectedEntregaTotal = Object.entries(entregaValores)
    .filter(([id]) => farmaciasComSelecionados.has(Number(id)))
    .reduce((s, [, v]) => s + v, 0)
  const selectedTotal = selectedSubtotal + selectedEntregaTotal

  return (
    <>
      <Header showBack />

      {isEmpty ? (
        <div className="carrinho-vazio">
          <span className="material-symbols-outlined">shopping_cart</span>
          <h2>Seu carrinho está vazio</h2>
          <p>Adicione produtos para continuar</p>
          <Link to="/" className="btn-voltar-home">Explorar produtos</Link>
        </div>
      ) : (
        <div className="cart-page">
          <h1 className="page-title">
            Meu Carrinho
            <span className="count">{totalItens} {totalItens === 1 ? 'item' : 'itens'}</span>
          </h1>

          <div className="items-col" id="itemsCol">
            {itemsByFarmacia.map((farm, fIdx) => {
              const allSelected = farm.items.every(i => selectedItems[i.id] !== false)
              const someSelected = farm.items.some(i => selectedItems[i.id] !== false)

              return (
                <div key={farm.id}>
                  {fIdx > 0 && <div className="farmacia-sep">outro pedido</div>}

                  <div className="card grupo-farmacia">
                    <div className="farmacia-header">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          className="item-checkbox"
                          checked={allSelected}
                          ref={el => { if (el) el.indeterminate = someSelected && !allSelected }}
                          onChange={() => toggleAll(farm.items)}
                        />
                        <span className="checkbox-custom" />
                      </label>
                      <div>
                        <p className="farmacia-name">{farm.nome}</p>
                        <p className="farmacia-loc">
                          <span className="material-symbols-outlined">location_on</span>
                          {farm.local}
                        </p>
                      </div>
                    </div>

                    {farm.items.map(item => {
                      const isSelected = selectedItems[item.id] !== false
                      return (
                        <div key={item.id} className={`item ${!isSelected ? 'item-desmarcado' : ''}`}>
                          <label className="checkbox-label item-checkbox-wrap">
                            <input
                              type="checkbox"
                              className="item-checkbox"
                              checked={isSelected}
                              onChange={() => toggleItem(item.id)}
                            />
                            <span className="checkbox-custom" />
                          </label>

                          <img className="item-img" src={item.img} alt={item.nome} />
                          <div className="item-info">
                            <p className="item-marca">{item.marca}</p>
                            <p className="item-nome">{item.nome}</p>
                            <p className="item-dosagem">{item.dosagem}</p>
                            <div className="item-bottom">
                              <div className="item-preco">
                                {item.precoOriginal && <del>{fmt(item.precoOriginal)}</del>}
                                <strong>{fmt(item.preco * item.qtd)}</strong>
                                {item.precoOriginal && (
                                  <span className="item-badge-off">
                                    {Math.round((1 - item.preco / item.precoOriginal) * 100)}% OFF
                                  </span>
                                )}
                              </div>
                              <div className="item-bottom-row">
                                <div className="qtd-ctrl">
                                  <button onClick={() => alterarQtd(item.id, -1)}>−</button>
                                  <span className="qtd-val">{item.qtd}</span>
                                  <button onClick={() => alterarQtd(item.id, 1)}>+</button>
                                </div>
                                <button className="btn-remover" onClick={() => removerItem(item.id)}>
                                  <span className="material-symbols-outlined">delete</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}

                    {/* ENTREGA dentro do card da farmácia */}
                    <div className="entrega-interna">
                      <p className="section-label entrega-label-interna">Entrega</p>
                      <div className="entrega-opts">
                        <label
                          className={`entrega-opt ${entregaValores[farm.id] === 5.90 ? 'ativo' : ''}`}
                          onClick={() => setEntrega(farm.id, 5.90)}
                        >
                          <input type="radio" name={`entrega${farm.id}`} readOnly checked={entregaValores[farm.id] === 5.90} />
                          <div className="radio-dot" />
                          <span className="material-symbols-outlined entrega-icon">local_shipping</span>
                          <div className="entrega-text">
                            <p className="entrega-titulo">Entrega rápida</p>
                            <p className="entrega-sub">Receba hoje até 18h</p>
                          </div>
                          <span className="entrega-preco pago">R$ 5,90</span>
                        </label>
                        <label
                          className={`entrega-opt ${entregaValores[farm.id] === 0 ? 'ativo' : ''}`}
                          onClick={() => setEntrega(farm.id, 0)}
                        >
                          <input type="radio" name={`entrega${farm.id}`} readOnly checked={entregaValores[farm.id] === 0} />
                          <div className="radio-dot" />
                          <span className="material-symbols-outlined entrega-icon">storefront</span>
                          <div className="entrega-text">
                            <p className="entrega-titulo">Retirada na farmácia</p>
                            <p className="entrega-sub">Disponível em 30 min</p>
                          </div>
                          <span className="entrega-preco">Grátis</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* RESUMO */}
          <aside className="resumo-col">
            <div className="card resumo-card">
              <p className="resumo-titulo">Resumo do pedido</p>

              <div className="resumo-body">
                <div className="resumo-row">
                  <span>Subtotal ({selectedTotalItens} {selectedTotalItens === 1 ? 'item' : 'itens'})</span>
                  <span>{fmt(selectedSubtotal)}</span>
                </div>
                {selectedDescontos > 0 && (
                  <div className="resumo-row desconto">
                    <span>Descontos</span>
                    <span>− {fmt(selectedDescontos)}</span>
                  </div>
                )}
                <div className="resumo-row">
                  <span>Entrega</span>
                  <span>{selectedEntregaTotal === 0 ? 'Grátis' : fmt(selectedEntregaTotal)}</span>
                </div>
                <hr className="resumo-divider" />
                <div className="resumo-row total">
                  <span>Total</span>
                  <span>{fmt(selectedTotal)}</span>
                </div>
                {selectedTotalItens > 0 && (
                  <p className="parcelado-info">
                    Em <strong>6x de {fmt(selectedTotal / 6)}</strong> sem juros
                  </p>
                )}
              </div>

              <div className="resumo-footer">
                {selectedTotalItens === 0 && (
                  <p className="aviso-selecao">Selecione ao menos um produto</p>
                )}
                <Link to="/checkout">
                  <button className="btn-checkout" disabled={selectedTotalItens === 0}>
                    <span className="btn-checkout-icon">⚡</span>
                    Finalizar pedido
                  </button>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}

      <NavMobileBottom />
    </>
  )
}
