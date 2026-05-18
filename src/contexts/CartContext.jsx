import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const [entregaValores, setEntregaValores] = useState({ 1: 5.90, 2: 7.90 })

  function alterarQtd(id, delta) {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qtd: Math.max(1, item.qtd + delta) } : item
      )
    )
  }

  function removerItem(id) {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  function setEntrega(farmaciaId, valor) {
    setEntregaValores(prev => ({ ...prev, [farmaciaId]: valor }))
  }

  function addItem(produto) {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === produto.id)
      if (exists) return prev.map(i => i.id === produto.id ? { ...i, qtd: i.qtd + 1 } : i)
      return [...prev, { ...produto, qtd: 1, farmacia: 1 }]
    })
  }

  const totalItens = cartItems.reduce((s, i) => s + i.qtd, 0)
  const subtotal = cartItems.reduce((s, i) => s + i.preco * i.qtd, 0)
  const descontos = cartItems.reduce((s, i) => s + (i.precoOriginal ? (i.precoOriginal - i.preco) * i.qtd : 0), 0)
  const entregaTotal = Object.values(entregaValores).reduce((a, b) => a + b, 0)
  const total = subtotal + entregaTotal

  return (
    <CartContext.Provider value={{
      cartItems, alterarQtd, removerItem, addItem,
      entregaValores, setEntrega,
      totalItens, subtotal, descontos, entregaTotal, total,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
