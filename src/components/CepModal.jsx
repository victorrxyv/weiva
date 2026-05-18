import { useState, useRef, useEffect } from 'react'
import { useCep } from '../contexts/CepContext.jsx'

export default function CepModal() {
  const { modalAberto, fecharModal, salvarCidade } = useCep()
  const [cep, setCep] = useState('')
  const [feedback, setFeedback] = useState({ msg: '', tipo: '' })
  const inputRef = useRef(null)

  useEffect(() => {
    if (modalAberto) {
      setFeedback({ msg: '', tipo: '' })
      setTimeout(() => inputRef.current?.focus(), 320)
    }
  }, [modalAberto])

  function formatCep(val) {
    let v = val.replace(/\D/g, '').slice(0, 8)
    if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5)
    return v
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) fecharModal()
  }

  async function confirmarCep() {
    const val = cep.replace(/\D/g, '')
    if (val.length !== 8) {
      setFeedback({ msg: 'Digite um CEP válido com 8 dígitos.', tipo: 'error' })
      return
    }
    setFeedback({ msg: 'Buscando CEP...', tipo: '' })
    try {
      const res = await fetch(`https://viacep.com.br/ws/${val}/json/`)
      const data = await res.json()
      if (data.erro) {
        setFeedback({ msg: 'CEP não encontrado. Tente novamente.', tipo: 'error' })
      } else {
        const cidade = `${data.localidade}, ${data.uf}`
        setFeedback({ msg: `✓ ${cidade}`, tipo: 'success' })
        salvarCidade(cidade)
        setTimeout(fecharModal, 1400)
      }
    } catch {
      setFeedback({ msg: 'Erro ao buscar o CEP.', tipo: 'error' })
    }
  }

  function usarLocalizacao() {
    if (!navigator.geolocation) {
      setFeedback({ msg: 'Geolocalização não suportada neste dispositivo.', tipo: 'error' })
      return
    }
    setFeedback({ msg: 'Obtendo sua localização...', tipo: '' })
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude, longitude } = pos.coords
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
          const data = await res.json()
          const cepRaw = data.address?.postcode?.replace(/\D/g, '') || ''
          const cidade = data.address?.city || data.address?.town || data.address?.village || ''
          if (cidade) {
            setCep(cepRaw ? cepRaw.slice(0, 5) + '-' + cepRaw.slice(5) : '')
            setFeedback({ msg: `✓ ${cidade} localizado!`, tipo: 'success' })
            salvarCidade(cidade)
            setTimeout(fecharModal, 1400)
          } else {
            setFeedback({ msg: 'Localização obtida, mas cidade não encontrada.', tipo: 'error' })
          }
        } catch {
          setFeedback({ msg: 'Não foi possível obter o endereço.', tipo: 'error' })
        }
      },
      () => setFeedback({ msg: 'Permissão de localização negada.', tipo: 'error' })
    )
  }

  return (
    <div
      className={`cep-modal-overlay ${modalAberto ? 'active' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="cep-modal">
        <div className="cep-modal-handle" />
        <h3>Informe seu CEP</h3>
        <p>Para encontrar farmácias e produtos disponíveis na sua região.</p>

        <div className="cep-input-row">
          <span className="cep-icon material-symbols-outlined">location_on</span>
          <input
            ref={inputRef}
            type="text"
            value={cep}
            onChange={e => setCep(formatCep(e.target.value))}
            onKeyDown={e => e.key === 'Enter' && confirmarCep()}
            placeholder="00000-000"
            maxLength={9}
            inputMode="numeric"
          />
          <button onClick={confirmarCep}>
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>

        <div className="cep-divider">ou</div>

        <button className="cep-geo-btn" onClick={usarLocalizacao}>
          <span className="material-symbols-outlined">my_location</span>
          Usar minha localização
        </button>

        <div className={`cep-feedback ${feedback.tipo}`}>{feedback.msg}</div>
      </div>
    </div>
  )
}
