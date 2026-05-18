import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from '../components/Header.jsx'
import { useCart } from '../contexts/CartContext.jsx'
import { useFavoritos } from '../contexts/FavoritosContext.jsx'

const PRODUTO_DEFAULT = {
  id: 99,
  img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAk-HADJGkID3Pu51cerTLpBlqx16ecxfaEg&s',
  marca: 'Teuto',
  nome: 'Medicamento Genérico 20mg c/ 28 cápsulas',
  dosagem: 'Genérico · Cápsula · 20mg',
  preco: 18.30,
  precoOriginal: 22.90,
  receita: true,
  farmacia: 'Pague Menos',
}

export default function ProductPage() {
  const { state } = useLocation()
  const PRODUTO = state?.produto ?? PRODUTO_DEFAULT
  const [qtd, setQtd] = useState(1)
  const [adicionado, setAdicionado] = useState(false)
  const { toggleFavorito, isFavorito } = useFavoritos()
  const favoritado = isFavorito(PRODUTO.id)
  const { addItem } = useCart()

  const desconto = Math.round((1 - PRODUTO.preco / PRODUTO.precoOriginal) * 100)

  function handleAddCart() {
    addItem({ ...PRODUTO, qtd })
    setAdicionado(true)
    setTimeout(() => setAdicionado(false), 2000)
  }

  return (
    <>
      <Header showBack />

      <main className="product-page">
        {/* GALERIA */}
        <section className="galeria" aria-label="Imagens do produto">
          <figure className="galeria-main">
            <img src={PRODUTO.img} alt={PRODUTO.nome} />
            <mark className="galeria-badge" aria-label={`Desconto de ${desconto}%`}>-{desconto}%</mark>
          </figure>
        </section>

        {/* PAINEL */}
        <div className="painel">

          {/* PREÇO */}
          <section className="card preco-card">
            <div className="div-btn-fav">
              <button
                className={`btn-fav ${favoritado ? 'ativo' : ''}`}
                onClick={() => toggleFavorito(PRODUTO)}
                aria-pressed={favoritado}
                aria-label="Favoritar produto"
              >
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>

            <p className="prod-marca-prod">{PRODUTO.marca}</p>
            <h1 className="prod-nome">{PRODUTO.nome}</h1>
            <p className="prod-dosagem-prod">{PRODUTO.dosagem}</p>
            <hr />

            {PRODUTO.receita && (
              <div className="badge-receita-prod">
                <p>
                  <em>
                    <span className="material-symbols-outlined">info</span>
                    {' '}Necessita de receita
                  </em>
                </p>
                <p>É obrigatório o envio da receita digital e/ou a entrega da receita física original. Sem a receita, o pedido não poderá ser entregue.</p>
              </div>
            )}

            <div className="badge-oferta">
              <span className="material-symbols-outlined">local_fire_department</span>
              <p>Oferta do dia</p>
            </div>

            <del className="preco-old">R$ {PRODUTO.precoOriginal.toFixed(2).replace('.', ',')}</del>
            <div className="preco-main">
              <strong className="preco-valor">R$ {PRODUTO.preco.toFixed(2).replace('.', ',')}</strong>
              <span className="preco-desconto">{desconto}% OFF</span>
            </div>
            <p className="preco-parcelado">
              Em <strong>6x de R$ {(PRODUTO.preco / 6).toFixed(2).replace('.', ',')}</strong> sem juros
            </p>

            <div className="cupom-row">
              <span className="material-symbols-outlined">local_offer</span>
              <p>Use o cupom <strong>WEIVA10</strong> e ganhe 10% adicional</p>
            </div>

            <div className="qtd-section">
              <span>Quantidade:</span>
              <div className="qtd-ctrl">
                <button onClick={() => setQtd(v => Math.max(1, v - 1))}>−</button>
                <span className="qtd-val">{qtd}</span>
                <button onClick={() => setQtd(v => v + 1)}>+</button>
              </div>
            </div>

            <div className="btn-group">
              <Link to="/checkout">
                <button className="btn-checkout-prod">
                  <span className="material-symbols-outlined">bolt</span>
                  Comprar agora
                </button>
              </Link>
              <button className={`btn-comprar${adicionado ? ' adicionado' : ''}`} onClick={handleAddCart}>
                <span className="material-symbols-outlined">{adicionado ? 'check_circle' : 'shopping_bag'}</span>
                {adicionado ? '✔ Adicionado' : 'Adicionar ao carrinho'}
              </button>
            </div>

            {/* VENDIDO POR */}
            <div className="vendido-por-wrap">
              <p className="vendido-por-label">Vendido por</p>
              <div className="vendido-por-row">
                <div className="vendido-por-info">
                  <img src="/img/farmacias/paguemenos.png" alt="Pague Menos" className="vendido-logo" />
                  <div>
                    <p className="vendido-nome">{PRODUTO.farmacia}</p>
                    <p className="vendido-loc">
                      <span className="material-symbols-outlined">location_on</span>
                      Tauá, CE
                    </p>
                  </div>
                </div>
                <div className="vendido-rating">
                  <span className="material-symbols-outlined star-icon">star</span>
                  <span>4,7</span>
                </div>
              </div>
              <button className="btn-ver-farmacia">
                <span className="material-symbols-outlined">storefront</span>
                Ver farmácia
              </button>
            </div>

            {/* FORMAS DE PAGAMENTO */}
            <div className="pagamento-wrap">
              <p className="pagamento-label">Formas de pagamento</p>
              <div className="pagamento-metodo">
                <span className="material-symbols-outlined pagamento-icon">credit_card</span>
                <span>Cartões de crédito</span>
              </div>
              <div className="pagamento-bandeiras">
                <img src="https://www.maquinadecartao.com/img/1/elo-logo-bandeira-de-maquininha-de-cartao-david-tech.webp" alt="Elo" />
                <img src="https://investidorsardinha.r7.com/wp-content/uploads/2020/08/bandeiras-de-cartao-de-credito-como-funcionam-e-principais-375x211.png" alt="Visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" />
              </div>
              <div className="pagamento-metodo" style={{ marginTop: '10px' }}>
                <span className="material-symbols-outlined pagamento-icon">qr_code_2</span>
                <span>PIX</span>
              </div>
              <div className="pagamento-bandeiras">
                <img src="https://cnt.recarga.com/landingfiles/photos/logo-pix-significa.png" alt="PIX" />
              </div>
              <div className="pagamento-metodo" style={{ marginTop: '10px' }}>
                <span className="material-symbols-outlined pagamento-icon">barcode</span>
                <span>Boleto Bancário</span>
              </div>
              <div className="pagamento-bandeiras">
                <img src="https://static.wixstatic.com/media/e363b2_01afd8a9073b4645874b7b097691ebd5~mv2.png/v1/fill/w_568,h_362,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e363b2_01afd8a9073b4645874b7b097691ebd5~mv2.png" alt="boleto" />
              </div>
            </div>
          </section>

          {/* DESCRIÇÃO */}
          <section className="card desc-card">
            <h3>Descrição</h3>
            <p>Medicamento indicado para uso sob prescrição médica. Conservar em temperatura ambiente, ao abrigo da luz e umidade. Manter fora do alcance de crianças.</p>
            <ul>
              <li>Princípio ativo: Genérico 20mg</li>
              <li>Apresentação: Cápsulas</li>
              <li>Quantidade: 28 unidades</li>
              <li>Fabricante: Teuto</li>
              <li>Registro ANVISA: 123456789</li>
            </ul>
          </section>
        </div>
      </main>

    </>
  )
}
