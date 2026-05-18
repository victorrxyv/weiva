import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext.jsx'
import { useFavoritos } from '../contexts/FavoritosContext.jsx'

export default function ProductCard({
  id = 99,
  img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAk-HADJGkID3Pu51cerTLpBlqx16ecxfaEg&s',
  marca = 'Genérico',
  nome = 'Medicamento Genérico',
  dosagem = 'c/ 30 unidades',
  farmacia = 'Pague Menos',
  preco = 24.90,
  precoOriginal = null,
  receita = false,
  to = '/produto',
}) {
  const { addItem } = useCart()
  const { toggleFavorito, isFavorito } = useFavoritos()
  const [adicionado, setAdicionado] = useState(false)

  const desconto = precoOriginal
    ? Math.round((1 - preco / precoOriginal) * 100)
    : null

  const favorito = isFavorito(id)

  function handleAdd(e) {
    e.preventDefault()
    e.stopPropagation()
    if (adicionado) return
    addItem({ id, img, marca, nome, dosagem, preco, precoOriginal, farmacia })
    setAdicionado(true)
    setTimeout(() => setAdicionado(false), 2000)
  }

  function handleFavorito(e) {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorito({ id, img, marca, nome, dosagem, preco, precoOriginal, farmacia, receita })
  }

  return (
    <Link to={to} state={{ produto: { id, img, marca, nome, dosagem, farmacia, preco, precoOriginal, receita } }}>
      <div className={`prod-card ${adicionado ? 'card-adicionado' : ''}`}>
        <div className="img-wrap">
          <img className="prod-img" src={img} alt={nome} />
          {desconto && !receita && (
            <p className="badge-desconto">-{desconto}%</p>
          )}
          {receita && (
            <p className="badge-receita">
              <span className="material-symbols-outlined">info</span> Receita
            </p>
          )}
          {/* Botão favorito no canto superior direito */}
          <button
            className={`btn-card-fav ${favorito ? 'ativo' : ''}`}
            onClick={handleFavorito}
            aria-label={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <span className="material-symbols-outlined">
              {favorito ? 'favorite' : 'favorite_border'}
            </span>
          </button>
        </div>

        <div className="card-body">
          <div className="prod-marca">{marca}</div>
          <div className="prod-name">{nome}</div>
          <div className="prod-dosagem">{dosagem}</div>
          <div className="prod-farmacia">
            <span className="material-symbols-outlined">store</span> {farmacia}
          </div>
        </div>

        <div className="card-footer">
          <div className="prod-prices">
            {precoOriginal && (
              <div className="prod-price-old">
                R$ {precoOriginal.toFixed(2).replace('.', ',')}
              </div>
            )}
            <div className="prod-price">
              R$ {preco.toFixed(2).replace('.', ',')}
            </div>
          </div>
          <button
            className={`btn-add ${adicionado ? 'btn-add-ok' : ''}`}
            onClick={handleAdd}
            aria-label="Adicionar ao carrinho"
          >
            <span className="material-symbols-outlined">
              {adicionado ? 'check' : 'shopping_bag'}
            </span>
          </button>
        </div>

        {/* TOAST */}
        <div className={`card-toast ${adicionado ? 'card-toast-show' : ''}`}>
          <span className="material-symbols-outlined">check_circle</span>
          Adicionado ao carrinho
        </div>
      </div>
    </Link>
  )
}
