import { useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import './ParceiroBeneficiosPage.css'
import NavMobileBottom from '../components/NavMobileBottom.jsx'

const BENEFICIOS = [
  {
    icon: 'trending_up',
    titulo: 'Mais vendas',
    desc: 'Aumente seu alcance local e venda para clientes que ainda não conhecem sua farmácia.',
  },
  {
    icon: 'local_shipping',
    titulo: 'Entregas rápidas',
    desc: 'Infraestrutura de entrega já pronta. Você foca em vender, a gente cuida do resto.',
  },
  {
    icon: 'payments',
    titulo: 'Repasse rápido',
    desc: 'Receba o valor das suas vendas em até 2 dias úteis, direto na conta da farmácia.',
  },
  {
    icon: 'storefront',
    titulo: 'Vitrine digital',
    desc: 'Sua farmácia visível para milhares de clientes na região com perfil completo e avaliações.',
  },
  {
    icon: 'bar_chart',
    titulo: 'Relatórios e métricas',
    desc: 'Acompanhe vendas, pedidos e desempenho em tempo real pelo painel administrativo.',
  },
  {
    icon: 'support_agent',
    titulo: 'Suporte dedicado',
    desc: 'Time de suporte disponível para ajudar com cadastro, dúvidas e problemas operacionais.',
  },
]

export default function ParceiroBeneficiosPage() {
  const navigate = useNavigate()

  return (
    <>
      <Header showBack />

      <main className="parceiro-page">

        {/* HERO */}
        <section className="parceiro-hero">
          <img src="/img/weiva/icon.png" alt="Weiva" className="parceiro-hero-icon" />
          <img src="/img/weiva/logo.png" alt="Weiva" className="parceiro-hero-logo" />
          <h1>Cadastre sua farmácia na Weiva!</h1>
          <p>Leve seus produtos a milhares de clientes na região. Rápido, simples e sem burocracia.</p>
        </section>

        {/* BENEFÍCIOS */}
        <section className="parceiro-beneficios">
          {BENEFICIOS.map((b, i) => (
            <div key={i} className="parceiro-card">
              <div className="parceiro-card-icon">
                <span className="material-symbols-outlined">{b.icon}</span>
              </div>
              <div>
                <p className="parceiro-card-titulo">{b.titulo}</p>
                <p className="parceiro-card-desc">{b.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <div className="parceiro-cta">
          <button className="parceiro-btn" onClick={() => navigate('/parceiro/cadastro')}>
            <span className="material-symbols-outlined">storefront</span>
            Quero ser parceiro
          </button>
          <p className="parceiro-cta-sub">Gratuito para começar. Sem taxas de adesão.</p>
        </div>

      </main>

      <NavMobileBottom />
    </>
  )
}
