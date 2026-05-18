import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import { useCart } from '../contexts/CartContext.jsx'
import NavMobileBottom from '../components/NavMobileBottom.jsx'

function fmt(v) {
  return `R$ ${v.toFixed(2).replace('.', ',')}`
}

export default function CheckoutPage() {
  const { cartItems, alterarQtd, removerItem, subtotal, descontos, entregaTotal, total } = useCart()
  const navigate = useNavigate()

  const [pagamento, setPagamento] = useState('pix')
  const [enderecoAberto, setEnderecoAberto] = useState(false)
  const [endereco, setEndereco] = useState({ cep: '', numero: '', rua: '', complemento: '', bairro: '', cidade: '', estado: '' })

  function formatCEP(val) {
    let v = val.replace(/\D/g, '').slice(0, 8)
    if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5)
    return v
  }

  function handleEndereco(e) {
    const { name, value } = e.target
    setEndereco(prev => ({ ...prev, [name]: name === 'cep' ? formatCEP(value) : value }))
  }

  function handleFinalize(e) {
    e.preventDefault()
    alert('Pedido realizado com sucesso! 🎉')
    navigate('/')
  }

  return (
    <>
      <Header showBack />

      <div className="checkout-page">
        <div className="checkout-left">

          {/* PRODUTOS */}
          <section className="checkout-card" aria-labelledby="products-heading">
            <div className="card-head">
              <h2 className="card-title" id="products-heading">
                <span className="material-symbols-outlined">shopping_bag</span>
                Itens do Pedido
              </h2>
            </div>
            <ul className="product-list">
              {cartItems.map(item => (
                <li key={item.id} className="product-item">
                  <img className="product-img" src={item.img} alt={item.nome} />
                  <div className="product-details">
                    <span className="product-brand">{item.marca}</span>
                    <span className="product-name">{item.nome}</span>
                    <span className="product-dosage">{item.dosagem}</span>
                    <div className="product-controls">
                      <div className="qty-control">
                        <button className="qty-btn" type="button" onClick={() => alterarQtd(item.id, -1)}>−</button>
                        <span className="qty-value">{item.qtd}</span>
                        <button className="qty-btn" type="button" onClick={() => alterarQtd(item.id, 1)}>+</button>
                      </div>
                    </div>
                  </div>
                  <div className="product-price-col">
                    <span className="product-price">{fmt(item.preco * item.qtd)}</span>
                    <span className="product-unit-price">{fmt(item.preco)} / un.</span>
                    <button
                      className="product-remove" type="button"
                      aria-label="Remover produto"
                      onClick={() => removerItem(item.id)}
                    >
                      <span className="material-symbols-outlined">delete_outline</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* ENDEREÇO */}
          <section className="checkout-card" aria-labelledby="address-heading">
            <div className="card-head">
              <h2 className="card-title" id="address-heading">
                <span className="material-symbols-outlined">local_shipping</span>
                Endereço de Entrega
              </h2>
            </div>
            <div className="card-body-checkout">
              <button
                className="card-action" type="button"
                onClick={() => setEnderecoAberto(v => !v)}
                aria-expanded={enderecoAberto}
              >
                <span className="material-symbols-outlined">add_location_alt</span>
                {enderecoAberto ? 'Cancelar' : 'Novo endereço'}
              </button>

              {enderecoAberto && (
                <form className="address-form" onSubmit={e => { e.preventDefault(); setEnderecoAberto(false) }}>
                  <div className="field-group">
                    <div className="field">
                      <label htmlFor="cep-input">CEP *</label>
                      <input type="text" id="cep-input" name="cep"
                        placeholder="00000-000" maxLength={9} inputMode="numeric"
                        value={endereco.cep} onChange={handleEndereco} required />
                    </div>
                    <div className="field">
                      <label htmlFor="numero-input">Número *</label>
                      <input type="text" id="numero-input" name="numero"
                        placeholder="142" inputMode="numeric"
                        value={endereco.numero} onChange={handleEndereco} required />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="rua-input">Rua *</label>
                    <input type="text" id="rua-input" name="rua"
                      placeholder="Rua das Flores"
                      value={endereco.rua} onChange={handleEndereco} required />
                  </div>
                  <div className="field-group">
                    <div className="field">
                      <label htmlFor="complemento-input">Complemento</label>
                      <input type="text" id="complemento-input" name="complemento"
                        placeholder="Apto 301"
                        value={endereco.complemento} onChange={handleEndereco} />
                    </div>
                    <div className="field">
                      <label htmlFor="bairro-input">Bairro *</label>
                      <input type="text" id="bairro-input" name="bairro"
                        placeholder="Meireles"
                        value={endereco.bairro} onChange={handleEndereco} required />
                    </div>
                  </div>
                  <div className="field-group">
                    <div className="field">
                      <label htmlFor="cidade-input">Cidade *</label>
                      <input type="text" id="cidade-input" name="cidade"
                        placeholder="Fortaleza"
                        value={endereco.cidade} onChange={handleEndereco} required />
                    </div>
                    <div className="field" style={{ maxWidth: 100 }}>
                      <label htmlFor="estado-input">Estado *</label>
                      <input type="text" id="estado-input" name="estado"
                        placeholder="CE" maxLength={2}
                        value={endereco.estado} onChange={handleEndereco} required />
                    </div>
                  </div>
                  <button className="btn-red" type="submit">
                    <span className="material-symbols-outlined">save</span>
                    Salvar Endereço
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* PAGAMENTO */}
          <section className="checkout-card" aria-labelledby="payment-heading">
            <div className="card-head">
              <h2 className="card-title" id="payment-heading">
                <span className="material-symbols-outlined">credit_card</span>
                Forma de Pagamento
              </h2>
            </div>
            <div className="card-body-checkout">
              <div className="payment-options">
                <label className={`payment-option ${pagamento === 'pix' ? 'selected' : ''}`} onClick={() => setPagamento('pix')}>
                  <input type="radio" name="pagamento" value="pix" readOnly checked={pagamento === 'pix'} />
                  <img src="https://cnt.recarga.com/landingfiles/photos/logo-pix-significa.png" alt="Pix" />
                  <p className="payment-label">PIX</p>
                  <span className="pay-badge">Aprovação instantânea</span>
                </label>

                <label className={`payment-option ${pagamento === 'credit' ? 'selected' : ''}`} onClick={() => setPagamento('credit')}>
                  <input type="radio" name="pagamento" value="credit" readOnly checked={pagamento === 'credit'} />
                  <span className="material-symbols-outlined pay-icon">credit_card</span>
                  <p className="payment-label">Cartão de Crédito</p>
                  <span className="pay-badge">Até 6x sem juros</span>
                </label>

                <label className={`payment-option ${pagamento === 'debit' ? 'selected' : ''}`} onClick={() => setPagamento('debit')}>
                  <input type="radio" name="pagamento" value="debit" readOnly checked={pagamento === 'debit'} />
                  <span className="material-symbols-outlined pay-icon">credit_score</span>
                  <p className="payment-label">Cartão de Débito</p>
                </label>
              </div>

              {pagamento === 'credit' && (
                <div className="card-form">
                  <div className="field">
                    <label>Número do cartão</label>
                    <input type="text" placeholder="0000 0000 0000 0000" maxLength={19} />
                  </div>
                  <div className="field">
                    <label>Nome no cartão</label>
                    <input type="text" placeholder="NOME SOBRENOME" />
                  </div>
                  <div className="field-group">
                    <div className="field">
                      <label>Validade</label>
                      <input type="text" placeholder="MM/AA" maxLength={5} />
                    </div>
                    <div className="field">
                      <label>CVV</label>
                      <input type="text" placeholder="000" maxLength={4} />
                    </div>
                  </div>
                  <div className="field">
                    <label>Parcelas</label>
                    <select>
                      {[1, 2, 3, 6].map(n => (
                        <option key={n}>
                          {n}x de {fmt(total / n)} {n === 1 ? '' : 'sem juros'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* RESUMO */}
        <aside className="checkout-resumo">
          <div className="checkout-card resumo-card">
            <h2 className="card-title">
              <span className="material-symbols-outlined">receipt_long</span>
              Resumo
            </h2>

            <div className="resumo-linha">
              <span>Subtotal</span>
              <span>{fmt(subtotal)}</span>
            </div>
            {descontos > 0 && (
              <div className="resumo-linha green">
                <span>Descontos</span>
                <span>− {fmt(descontos)}</span>
              </div>
            )}
            <div className="resumo-linha">
              <span>Entrega</span>
              <span>{entregaTotal === 0 ? 'Grátis' : fmt(entregaTotal)}</span>
            </div>
            <hr className="resumo-hr" />
            <div className="resumo-linha total">
              <strong>Total</strong>
              <strong>{fmt(total)}</strong>
            </div>

            <button className="btn-finalizar" onClick={handleFinalize}>
              <span className="material-symbols-outlined">check_circle</span>
              Finalizar pedido
            </button>

            <p className="seguranca">
              <span className="material-symbols-outlined">lock</span>
              Compra 100% segura
            </p>
          </div>
        </aside>
      </div>

      <NavMobileBottom />
    </>
  )
}
