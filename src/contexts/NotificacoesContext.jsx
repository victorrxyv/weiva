import { createContext, useContext, useState } from 'react'

const NotificacoesContext = createContext()

const NOTIFICACOES_MOCK = [
  {
    id: 1,
    tipo: 'oferta',
    titulo: 'Promoção relâmpago! ⚡',
    descricao: 'Dipirona Monoidratada 500mg com 50% OFF hoje até meia-noite.',
    farmacia: 'Pague Menos',
    tempo: '5 min atrás',
    lida: false,
  },
  {
    id: 2,
    tipo: 'oferta',
    titulo: 'Cupom exclusivo para você',
    descricao: 'Use o código WEIVA15 e ganhe 15% de desconto na sua próxima compra.',
    farmacia: 'Pague Menos',
    tempo: '1 hora atrás',
    lida: false,
  },
  {
    id: 3,
    tipo: 'oferta',
    titulo: 'Vitamina C em oferta',
    descricao: 'Vitamina C 1000mg — de R$ 49,90 por R$ 29,90. Estoque limitado!',
    farmacia: 'Pague Menos',
    tempo: '3 horas atrás',
    lida: false,
  },
  {
    id: 4,
    tipo: 'oferta',
    titulo: 'Produtos mais vendidos com desconto',
    descricao: 'Os 10 produtos mais vendidos da semana com até 30% OFF. Confira agora.',
    farmacia: 'Pague Menos',
    tempo: 'Ontem',
    lida: true,
  },
  {
    id: 5,
    tipo: 'oferta',
    titulo: 'Genéricos com preço especial',
    descricao: 'Medicamentos genéricos selecionados com descontos de até 40%. Válido esta semana.',
    farmacia: 'Pague Menos',
    tempo: 'Ontem',
    lida: true,
  },
  {
    id: 6,
    tipo: 'oferta',
    titulo: 'Linha de skincare em promoção',
    descricao: 'Hidratantes, protetores solares e séruns com preços imperdíveis.',
    farmacia: 'Pague Menos',
    tempo: '2 dias atrás',
    lida: true,
  },
]

export function NotificacoesProvider({ children }) {
  const [notificacoes, setNotificacoes] = useState(NOTIFICACOES_MOCK)

  const naoLidas = notificacoes.filter(n => !n.lida).length

  function marcarComoLida(id) {
    setNotificacoes(prev => prev.map(n => n.id === id ? { ...n, lida: true } : n))
  }

  function marcarTodasLidas() {
    setNotificacoes(prev => prev.map(n => ({ ...n, lida: true })))
  }

  return (
    <NotificacoesContext.Provider value={{ notificacoes, naoLidas, marcarComoLida, marcarTodasLidas }}>
      {children}
    </NotificacoesContext.Provider>
  )
}

export function useNotificacoes() {
  return useContext(NotificacoesContext)
}
