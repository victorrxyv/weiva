import { createContext, useContext, useState } from 'react'

const CepContext = createContext(null)

export function CepProvider({ children }) {
  const [cidadeCep, setCidadeCep] = useState(
    () => localStorage.getItem('cep_cidade') || 'Informe seu CEP'
  )
  const [modalAberto, setModalAberto] = useState(false)

  function abrirModal() { setModalAberto(true) }
  function fecharModal() { setModalAberto(false) }
  function salvarCidade(cidade) {
    setCidadeCep(cidade)
    localStorage.setItem('cep_cidade', cidade)
  }

  return (
    <CepContext.Provider value={{ cidadeCep, modalAberto, abrirModal, fecharModal, salvarCidade }}>
      {children}
    </CepContext.Provider>
  )
}

export function useCep() {
  return useContext(CepContext)
}
