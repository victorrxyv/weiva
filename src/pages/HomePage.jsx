import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Carousel from '../components/Carousel.jsx'
import ProductCard from '../components/ProductCard.jsx'
import NavMobileBottom from '../components/NavMobileBottom.jsx'

const PRODUTOS_DESTAQUE = [
  { id: 1, marca: 'Genérico', nome: 'Medicamento Genérico', dosagem: 'c/ 69 unidades', farmacia: 'Pague Menos', preco: 24.90 },
  { id: 2, marca: 'Genérico', nome: 'Medicamento Genérico Nome Longo Que Pode Quebrar', dosagem: 'c/ 24 cápsulas', farmacia: 'Pague Menos', preco: 18.30, precoOriginal: 22.90 },
  { id: 3, marca: 'Genérico', nome: 'Medicamento Genérico Nome Longo Que Pode Quebrar', dosagem: 'c/ 24 cápsulas', farmacia: 'Pague Menos', preco: 18.30, precoOriginal: 22.90, receita: true },
  { id: 4, marca: 'Genérico', nome: 'Medicamento Genérico Nome Longo Que Pode Quebrar', dosagem: 'c/ 24 cápsulas', farmacia: 'Pague Menos', preco: 18.30, receita: true },
]

export default function HomePage() {
  return (
    <>
      <Header />
      <Carousel />

      <section className="section-bloco">
        <div className="section-header">
          <h2><span className="material-symbols-outlined">shopping_bag_speed</span> Mais vendidos</h2>
          <Link to="/categoria">Ver todas</Link>
        </div>
        <div className="list-grid-wrap">
          {PRODUTOS_DESTAQUE.map(p => (
            <ProductCard key={p.id} {...p} to="/produto" />
          ))}
        </div>
      </section>

      <section className="section-bloco">
        <div className="section-header">
          <h2><span className="material-symbols-outlined">store</span> Farmácias parceiras</h2>
          <Link to="/farmacia">Ver todas</Link>
        </div>
        <div className="list-grid-wrap farmacias-list">
          <Link to="/farmacia" className="farmacia-card">
            <div className="farmacia-logo-wrap">
              <img src="/img/farmacias/paguemenos.png" alt="Pague Menos" />
            </div>
            <p className="farmacia-nome">Pague Menos</p>
            <div className="farmacia-avaliacao">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star"><i className="fa-solid fa-star" /></span>
              ))}
              <p>4,7</p>
            </div>
          </Link>
        </div>
      </section>

      <NavMobileBottom />
    </>
  )
}
