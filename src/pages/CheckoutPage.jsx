import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import { useCart } from '../contexts/CartContext.jsx'
import './CheckoutPage.css'

function fmt(v) {
  return `R$ ${v.toFixed(2).replace('.', ',')}`
}

// Logo oficial do PIX como SVG inline
const PixLogo = () => (
  <svg width="32" height="32" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M340.2 388.5c-22.3 0-43.3-8.7-59.1-24.4l-68.8-68.8c-6-6-15.8-6-21.8 0l-69.1 69.1c-15.8 15.8-36.8 24.4-59.1 24.4h-13l87.1 87.1c34.1 34.1 89.4 34.1 123.5 0l87.4-87.4h-7.1z" fill="#32BCAD"/>
    <path d="M62.3 135.5c22.3 0 43.3 8.7 59.1 24.4l69.1 69.1c6 6 15.8 6 21.8 0l68.8-68.8c15.8-15.8 36.8-24.4 59.1-24.4h7.1L260 48.4C225.9 14.3 170.6 14.3 136.5 48.4l-87.1 87.1h13z" fill="#32BCAD"/>
    <path d="M467.5 209.2l-62.2-62.2c1.4 4.5 2.1 9.2 2.1 14v57.2c0 16.2-6.3 31.4-17.8 42.9l-56.2 56.2c-11.4 11.4-26.7 17.8-42.9 17.8h-61.2c-16.2 0-31.4-6.3-42.9-17.8l-56.5-56.5c-11.4-11.4-17.8-26.7-17.8-42.9v-57.2c0-4.8.8-9.5 2.1-14L52 209.2c-34.1 34.1-34.1 89.4 0 123.5l62.2 62.2c-1.4-4.5-2.1-9.2-2.1-14v-40.2c0-16.2 6.3-31.4 17.8-42.9l56.5-56.5c11.4-11.4 26.7-17.8 42.9-17.8h61.2c16.2 0 31.4 6.3 42.9 17.8l56.2 56.2c11.4 11.4 17.8 26.7 17.8 42.9v40.2c0 4.8-.8 9.5-2.1 14l62.2-62.2c34.1-34 34.1-89.3 0-123.4z" fill="#32BCAD"/>
  </svg>
)

const PAGAMENTOS = [
  { id: 'pix',    label: 'PIX',                  badge: 'Aprovação instantânea', iconType: 'pix'    },
  { id: 'credit', label: 'Cartão de Crédito',     badge: null,                   iconType: 'credit' },
  { id: 'debit',  label: 'Cartão de Débito',      badge: null,                   iconType: 'debit'  },
  { id: 'cash',   label: 'Dinheiro (na entrega)', badge: null,                   iconType: 'cash'   },
]

const PayIcon = ({ type }) => {
  if (type === 'pix') return <PixLogo />
  if (type === 'credit') return <span className="material-symbols-outlined ck-pay-icon ck-pay-icon--credit">credit_card</span>
  if (type === 'debit')  return <span className="material-symbols-outlined ck-pay-icon ck-pay-icon--debit">payment</span>
  if (type === 'cash')   return <span className="material-symbols-outlined ck-pay-icon ck-pay-icon--cash">payments</span>
  return null
}

const CardForm = () => (
  <div className="ck-card-form">
    <div className="ck-field">
      <label>Número do cartão</label>
      <input type="text" placeholder="0000 0000 0000 0000" maxLength={19} />
    </div>
    <div className="ck-field">
      <label>Nome no cartão</label>
      <input type="text" placeholder="NOME SOBRENOME" />
    </div>
    <div className="ck-field-group">
      <div className="ck-field">
        <label>Validade</label>
        <input type="text" placeholder="MM/AA" maxLength={5} />
      </div>
      <div className="ck-field">
        <label>CVV</label>
        <input type="text" placeholder="000" maxLength={4} />
      </div>
    </div>
  </div>
)

export default function CheckoutPage() {
  const { cartItems, alterarQtd, removerItem, subtotal, descontos, entregaTotal, total } = useCart()
  const navigate = useNavigate()

  const [pagamento, setPagamento] = useState('pix')
  const [enderecoAberto, setEnderecoAberto] = useState(false)
  const [endereco, setEndereco] = useState({ cep: '', numero: '', rua: '', complemento: '', bairro: '', cidade: '', estado: '' })

  const totalItens = cartItems.reduce((s, i) => s + i.qtd, 0)

  function formatCEP(val) {
    let v = val.replace(/\D/g, '').slice(0, 8)
    if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5)
    return v
  }

  function handleEndereco(e) {
    const { name, value } = e.target
    setEndereco(prev => ({ ...prev, [name]: name === 'cep' ? formatCEP(value) : value }))
  }

  function handleFinalize() {
    alert('Pedido realizado com sucesso!')
    navigate('/')
  }

  const Resumo = () => (
    <>
      <div className="ck-resumo-rows">
        <div className="ck-resumo-row">
          <span>Subtotal</span>
          <span>{fmt(subtotal)}</span>
        </div>
        {descontos > 0 && (
          <div className="ck-resumo-row ck-green">
            <span>Desconto</span>
            <span>- {fmt(descontos)}</span>
          </div>
        )}
        <div className="ck-resumo-row">
          <span>Taxa de entrega</span>
          <span className={entregaTotal === 0 ? 'ck-green' : ''}>{entregaTotal === 0 ? 'Grátis' : fmt(entregaTotal)}</span>
        </div>
        <hr className="ck-hr" />
        <div className="ck-resumo-row ck-total">
          <strong>Total</strong>
          <strong className="ck-total-valor">{fmt(total)}</strong>
        </div>
      </div>
      <button className="ck-btn-confirmar" onClick={handleFinalize}>
        <span className="material-symbols-outlined">check_circle</span>
        Confirmar Pedido
      </button>
      <p className="ck-seguranca">
        <span className="material-symbols-outlined">lock</span>
        Pagamento seguro e criptografado
      </p>
    </>
  )

  return (
    <>
      <Header showBack />

      <div className="ck-page">
        <div className="ck-left">

          {/* PRODUTOS */}
          <section className="ck-card">
            <div className="ck-card-head">
              <div className="ck-card-title">
                <span className="material-symbols-outlined">shopping_bag</span>
                Produtos Selecionados
              </div>
              <span className="ck-badge">{totalItens} {totalItens === 1 ? 'item' : 'itens'}</span>
            </div>
            <ul className="ck-product-list">
              {cartItems.map(item => (
                <li key={item.id} className="ck-product-item">
                  <img className="ck-product-img" src={item.img} alt={item.nome} />
                  <div className="ck-product-info">
                    <p className="ck-product-nome">{item.nome}</p>
                    <p className="ck-product-sub">
                      {item.dosagem} · {item.marca}
                    </p>
                    <div className="ck-qty">
                      <button type="button" onClick={() => alterarQtd(item.id, -1)}>-</button>
                      <span>{item.qtd}</span>
                      <button type="button" onClick={() => alterarQtd(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <div className="ck-product-preco">
                    <span className="ck-preco-total">{fmt(item.preco * item.qtd)}</span>
                    <span className="ck-preco-unit">{fmt(item.preco)} / un.</span>
                    <button className="ck-del" type="button" onClick={() => removerItem(item.id)}>
                      <span className="material-symbols-outlined">delete_outline</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* ENDEREÇO */}
          <section className="ck-card">
            <div className="ck-card-head">
              <div className="ck-card-title">
                <span className="material-symbols-outlined">local_shipping</span>
                Endereço de Entrega
              </div>
            </div>
            <button
              className="ck-novo-endereco"
              type="button"
              onClick={() => setEnderecoAberto(v => !v)}
            >
              <span className="material-symbols-outlined">add_location_alt</span>
              {enderecoAberto ? 'Cancelar' : 'Novo endereço'}
            </button>

            {enderecoAberto && (
              <form className="ck-address-form" onSubmit={e => { e.preventDefault(); setEnderecoAberto(false) }}>
                <div className="ck-field-group">
                  <div className="ck-field">
                    <label>CEP *</label>
                    <input type="text" name="cep" placeholder="00000-000" maxLength={9} inputMode="numeric" value={endereco.cep} onChange={handleEndereco} required />
                  </div>
                  <div className="ck-field">
                    <label>Número *</label>
                    <input type="text" name="numero" placeholder="142" inputMode="numeric" value={endereco.numero} onChange={handleEndereco} required />
                  </div>
                </div>
                <div className="ck-field">
                  <label>Rua *</label>
                  <input type="text" name="rua" placeholder="Rua das Flores" value={endereco.rua} onChange={handleEndereco} required />
                </div>
                <div className="ck-field-group">
                  <div className="ck-field">
                    <label>Complemento</label>
                    <input type="text" name="complemento" placeholder="Apto 301" value={endereco.complemento} onChange={handleEndereco} />
                  </div>
                  <div className="ck-field">
                    <label>Bairro *</label>
                    <input type="text" name="bairro" placeholder="Meireles" value={endereco.bairro} onChange={handleEndereco} required />
                  </div>
                </div>
                <div className="ck-field-group">
                  <div className="ck-field">
                    <label>Cidade *</label>
                    <input type="text" name="cidade" placeholder="Fortaleza" value={endereco.cidade} onChange={handleEndereco} required />
                  </div>
                  <div className="ck-field" style={{ maxWidth: 100 }}>
                    <label>Estado *</label>
                    <input type="text" name="estado" placeholder="CE" maxLength={2} value={endereco.estado} onChange={handleEndereco} required />
                  </div>
                </div>
                <button className="ck-btn-salvar" type="submit">
                  <span className="material-symbols-outlined">save</span>
                  Salvar Endereço
                </button>
              </form>
            )}
          </section>

          {/* PAGAMENTO */}
          <section className="ck-card">
            <div className="ck-card-head">
              <div className="ck-card-title">
                <span className="material-symbols-outlined">credit_card</span>
                Forma de Pagamento
              </div>
            </div>
            <div className="ck-pagamento-list">
              {PAGAMENTOS.map(op => (
                <div key={op.id}>
                  <label
                    className={`ck-pagamento-opt${pagamento === op.id ? ' ativo' : ''}`}
                    onClick={() => setPagamento(op.id)}
                  >
                    <input type="radio" name="pagamento" readOnly checked={pagamento === op.id} />
                    <div className="ck-radio-dot" />
                    <PayIcon type={op.iconType} />
                    <span className="ck-pay-label">{op.label}</span>
                    {op.badge && <span className="ck-pay-badge">{op.badge}</span>}
                  </label>

                  {/* Campos do cartão logo abaixo do botão selecionado */}
                  {pagamento === op.id && (op.id === 'credit' || op.id === 'debit') && (
                    <CardForm />
                  )}
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* RESUMO DESKTOP — sticky sidebar */}
        <aside className="ck-resumo-desktop">
          <div className="ck-card">
            <div className="ck-card-head">
              <div className="ck-card-title">
                <span className="material-symbols-outlined">receipt_long</span>
                Resumo do Pedido
              </div>
              <span className="ck-badge">{totalItens} {totalItens === 1 ? 'item' : 'itens'}</span>
            </div>
            <Resumo />
          </div>
        </aside>
      </div>

      {/* RESUMO MOBILE — sticky fixo na parte inferior */}
      <div className="ck-resumo-mobile-sticky">
        <details className="ck-resumo-mobile-details">
          <summary className="ck-resumo-mobile-summary">
            <div className="ck-resumo-mobile-summary-left">
              <span className="material-symbols-outlined">receipt_long</span>
              <span>Resumo do Pedido</span>
              <span className="ck-badge">{totalItens} {totalItens === 1 ? 'item' : 'itens'}</span>
            </div>
            <span className="ck-resumo-mobile-total">{fmt(total)}</span>
            <span className="material-symbols-outlined ck-resumo-chevron">expand_less</span>
          </summary>
          <div className="ck-resumo-mobile-body">
            <Resumo />
          </div>
        </details>
      </div>
    </>
  )
}
