import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import { useCart } from '../contexts/CartContext.jsx'
import './CheckoutPage.css'

function fmt(v) {
  return `R$ ${v.toFixed(2).replace('.', ',')}`
}

const PixLogo = () => (
  <img
    src="https://cnt.recarga.com/landingfiles/photos/logo-pix-significa.png"
    alt="PIX"
    className="ck-pix-img"
  />
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
        {/* Detalhamento expansível */}
        <details className="ck-resumo-mobile-details">
          <summary className="ck-resumo-mobile-summary">
            <span className="material-symbols-outlined ck-resumo-chevron">expand_less</span>
            <span className="ck-resumo-mobile-ver">Ver detalhes</span>
            <span className="ck-badge">{totalItens} {totalItens === 1 ? 'item' : 'itens'}</span>
          </summary>
          <div className="ck-resumo-mobile-body">
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
            </div>
          </div>
        </details>

        {/* Total + botão sempre visíveis */}
        <div className="ck-resumo-mobile-footer">
          <div className="ck-resumo-mobile-total-row">
            <strong>Total</strong>
            <strong className="ck-total-valor">{fmt(total)}</strong>
          </div>
          <button className="ck-btn-confirmar" onClick={handleFinalize}>
            <span className="material-symbols-outlined">check_circle</span>
            Confirmar Pedido
          </button>
          <p className="ck-seguranca">
            <span className="material-symbols-outlined">lock</span>
            Pagamento seguro e criptografado
          </p>
        </div>
      </div>
    </>
  )
}
