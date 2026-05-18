import './NotificacoesPage.css'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import NavMobileBottom from '../components/NavMobileBottom.jsx'
import { useNotificacoes } from '../contexts/NotificacoesContext.jsx'

export default function NotificacoesPage() {
  const navigate = useNavigate()
  const { notificacoes, naoLidas, marcarComoLida, marcarTodasLidas } = useNotificacoes()

  return (
    <>
      <Header showBack />

      <div className="notif-page">
        <div className="notif-header">
          <h1 className="notif-titulo">Notificações</h1>
          {naoLidas > 0 && (
            <button className="notif-marcar-todas" onClick={marcarTodasLidas}>
              Marcar todas como lidas
            </button>
          )}
        </div>

        {naoLidas > 0 && (
          <p className="notif-resumo">
            Você tem <strong>{naoLidas}</strong> {naoLidas === 1 ? 'notificação não lida' : 'notificações não lidas'}
          </p>
        )}

        <div className="notif-lista">
          {notificacoes.map(n => (
            <div
              key={n.id}
              className={`notif-item ${!n.lida ? 'nao-lida' : ''}`}
              onClick={() => marcarComoLida(n.id)}
            >
              <div className="notif-icone-wrap">
                <img src="/img/farmacias/paguemenos.png" alt="Pague Menos" className="notif-logo" />
              </div>
              <div className="notif-corpo">
                <div className="notif-top-row">
                  <span className="notif-farmacia">{n.farmacia}</span>
                  <span className="notif-tempo">{n.tempo}</span>
                </div>
                <p className="notif-titulo-item">{n.titulo}</p>
                <p className="notif-desc">{n.descricao}</p>
              </div>
              {!n.lida && <div className="notif-dot" />}
            </div>
          ))}
        </div>
      </div>

      <NavMobileBottom />
    </>
  )
}
