import { useState } from 'react'
import Header from '../components/Header.jsx'
import ProductCard from '../components/ProductCard.jsx'
import NavMobileBottom from '../components/NavMobileBottom.jsx'

const TABS = [
  { id: 'estoque', icon: 'medication', label: 'Estoque' },
  { id: 'info',    icon: 'info',       label: 'Sobre'   },
]

const PRODUTOS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  marca: 'Genérico', nome: 'Medicamento Genérico Nome Longo',
  dosagem: 'c/ 24 cápsulas', farmacia: 'Pague Menos',
  preco: 18.30, precoOriginal: i % 2 === 0 ? 22.90 : null,
}))

const HORARIOS = [
  { dia: 'Domingo',   hoje: true,  abre: '08:00', fecha: '20:00' },
  { dia: 'Segunda',   hoje: false, abre: '07:00', fecha: '22:00' },
  { dia: 'Terça',     hoje: false, abre: '07:00', fecha: '22:00' },
  { dia: 'Quarta',    hoje: false, abre: '07:00', fecha: '22:00' },
  { dia: 'Quinta',    hoje: false, abre: '07:00', fecha: '22:00' },
  { dia: 'Sexta',     hoje: false, abre: '07:00', fecha: '22:00' },
  { dia: 'Sábado',    hoje: false, abre: '07:00', fecha: '22:00' },
]

function Stars({ rating = 4.7 }) {
  return (
    <span className="fp-stars">
      {[1,2,3,4,5].map(n => (
        <span key={n} className="material-symbols-outlined fp-star" style={{ fontVariationSettings: `'FILL' 1` }}>
          star
        </span>
      ))}
    </span>
  )
}

export default function FarmaciaPage() {
  const [tab, setTab] = useState('estoque')

  return (
    <>
      <Header showBack />

      {/* ── HERO (fundo branco, estilo referência) ── */}
      <div className="fp-hero">
        <div className="fp-hero-inner">
          <div className="fp-logo-wrap">
            <img src="/img/farmacias/paguemenos.png" alt="Pague Menos" />
          </div>
          <div className="fp-hero-info">
            <div className="fp-nome-row">
              <h1>Pague Menos</h1>
              <span className="material-symbols-outlined fp-verificado" style={{ fontVariationSettings: `'FILL' 1` }}>verified</span>
            </div>
            <div className="fp-rating-row">
              <Stars />
              <span className="fp-rating-num">4,7</span>
              <span className="fp-rating-count">(318 avaliações)</span>
              <span className="fp-aberta">● Aberta agora</span>
            </div>
            <div className="fp-meta-row">
              <span className="fp-meta-item">
                <span className="material-symbols-outlined">local_shipping</span>
                Entrega: 30–50 min
              </span>
              <span className="fp-meta-item">
                <span className="material-symbols-outlined">volunteer_activism</span>
                Frete grátis acima de R$ 59
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="fp-tabs-bar">
        <div className="fp-tabs">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`fp-tab ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              <span className="material-symbols-outlined">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="fp-content">

        {tab === 'estoque' && (
          <>
            <div className="fp-search-bar">
              <span className="material-symbols-outlined">search</span>
              <input type="search" placeholder="Buscar produtos no estoque" />
            </div>
            <section className="fp-section">
              <h2>
                <span className="material-symbols-outlined">shopping_bag_speed</span>
                Mais vendidos
              </h2>
              <div className="list-grid-wrap">
                {PRODUTOS.map(p => <ProductCard key={p.id} {...p} to="/produto" />)}
              </div>
            </section>
          </>
        )}

        {tab === 'info' && (
          <div className="fp-info-panel">

            {/* Informações */}
            <div className="fp-info-card">
              <h3 className="fp-info-card-title">
                <span className="material-symbols-outlined">info</span>
                Informações
              </h3>
              <div className="fp-info-row">
                <span className="material-symbols-outlined fp-info-icon">location_on</span>
                <div>
                  <p className="fp-info-label">ENDEREÇO</p>
                  <p className="fp-info-val">R. Monsenhor Juviniano Barreto, 52 - A - Centro, Tauá - CE</p>
                </div>
              </div>
              <div className="fp-info-row">
                <span className="material-symbols-outlined fp-info-icon">phone_in_talk</span>
                <div>
                  <p className="fp-info-label">WHATSAPP</p>
                  <p className="fp-info-val red">(85) 3257-1234</p>
                </div>
              </div>
            </div>

            {/* Horários */}
            <div className="fp-info-card">
              <h3 className="fp-info-card-title">
                <span className="material-symbols-outlined">schedule</span>
                Horário de funcionamento
              </h3>
              {HORARIOS.map(h => (
                <div key={h.dia} className={`fp-horario-row ${h.hoje ? 'hoje' : ''}`}>
                  <span className="fp-horario-dia">
                    {h.dia}
                    {h.hoje && <span className="fp-hoje-badge">hoje</span>}
                  </span>
                  <span className="fp-horario-hora">{h.abre} – {h.fecha}</span>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>

      <NavMobileBottom />
    </>
  )
}
