import { createContext, useContext, useState } from 'react'

const FavoritosContext = createContext(null)

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([])

  function toggleFavorito(produto) {
    setFavoritos(prev => {
      const exists = prev.find(f => f.id === produto.id)
      if (exists) return prev.filter(f => f.id !== produto.id)
      return [...prev, produto]
    })
  }

  function isFavorito(id) {
    return favoritos.some(f => f.id === id)
  }

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito, isFavorito }}>
      {children}
    </FavoritosContext.Provider>
  )
}

export function useFavoritos() {
  return useContext(FavoritosContext)
}
