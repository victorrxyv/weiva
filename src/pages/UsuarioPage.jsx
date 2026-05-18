import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFavoritos } from '../contexts/FavoritosContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import NavMobileBottom from '../components/NavMobileBottom.jsx'

const PEDIDOS = [
  { num: '#10234', nome: 'Dipirona 500mg + Vitamina C', farmacia: 'Pague Menos', data: '10 mai 2026', itens: 2, valor: 43.20, status: 'entregue' },
  { num: '#10231', nome: 'Vitamina C 1g + Dipirona', farmacia: 'Farmácia do Povo', data: '2 mai 2026', itens: 3, valor: 31.70, status: 'caminho' },
  { num: '#10228', nome: 'Protetor Solar FPS 50', farmacia: 'Droga Raia', data: '18 abr 2026', itens: 1, valor: 54.90, status: 'entregue' },
]
const STATUS_LABEL = { entregue: 'Entregue', caminho: 'A caminho', cancelado: 'Cancelado' }
const STATUS_CLASS = { entregue: 'badge-entregue', caminho: 'badge-caminho', cancelado: 'badge-cancelado' }

const MENU = [
  { id: 'dados',      icon: 'person',       label: 'Meus dados' },
  { id: 'enderecos',  icon: 'location_on',  label: 'Endereço' },
  { id: 'pedidos',    icon: 'receipt_long', label: 'Pedidos' },
  { id: 'cartoes',    icon: 'credit_card',  label: 'Cartões' },
  { id: 'favoritos',  icon: 'favorite',     label: 'Favoritos' },
  { id: 'config',     icon: 'settings',     label: 'Configurações' },
]

const [FORM_INIT] = [{ nome: '', sobrenome: '', email: '', cpf: '', genero: '', nascimento: '', telefone: '' }]

export default function UsuarioPage() {
  const [secao, setSecao]           = useState('dados')
  const [mobileSub, setMobileSub]   = useState(null) // null = lista mobile principal
  const [form, setForm]             = useState(FORM_INIT)
  const navigate = useNavigate()

  const [parceiroCadastro, setParceiroCadastro] = useState(false)
  const [parceiroForm, setParceiroForm]         = useState({})
  const [parceiroEnviado, setParceiroEnviado]   = useState(false)
  const { favoritos } = useFavoritos()

  function handleChange(e) { setForm(p => ({ ...p, [e.target.name]: e.target.value })) }

  /* ─── painel de conteúdo (shared desktop + mobile-sub) ─── */
  function Conteudo() {
    const s = mobileSub ?? secao

    if (s === 'dados') return (
      <div className="up-content-inner">
        <h2 className="up-content-title">Meus dados</h2>
        <form className="up-dados-form" onSubmit={e => { e.preventDefault(); alert('Salvo!') }}>
          <div className="up-row2">
            <div className="up-field"><label>NOME</label><input type="text" name="nome" value={form.nome} onChange={handleChange} /></div>
            <div className="up-field"><label>SOBRENOME</label><input type="text" name="sobrenome" value={form.sobrenome} onChange={handleChange} /></div>
          </div>
          <div className="up-field"><label>E-MAIL</label><input type="email" name="email" value={form.email} onChange={handleChange} /></div>
          <div className="up-row2">
            <div className="up-field"><label>CPF</label><input type="text" name="cpf" value={form.cpf} onChange={handleChange} /></div>
            <div className="up-field">
              <label>GÊNERO</label>
              <select name="genero" value={form.genero} onChange={handleChange}>
                <option value="">Selecionar</option>
                <option>Masculino</option><option>Feminino</option>
                <option>Outro</option><option>Prefiro não informar</option>
              </select>
            </div>
          </div>
          <div className="up-row2">
            <div className="up-field"><label>DATA DE NASCIMENTO</label><input type="date" name="nascimento" value={form.nascimento} onChange={handleChange} /></div>
            <div className="up-field"><label>TELEFONE / WHATSAPP</label><input type="tel" name="telefone" value={form.telefone} onChange={handleChange} /></div>
          </div>
          <button className="up-salvar" type="submit">Salvar alterações</button>
        </form>
      </div>
    )

    if (s === 'enderecos') return (
      <div className="up-content-inner">
        <h2 className="up-content-title">Endereços</h2>
        <div className="up-endereco-card">
          <span className="material-symbols-outlined up-item-icon">home</span>
          <div className="up-endereco-info">
            <p className="up-endereco-titulo">Casa <span className="up-badge-principal">Principal</span></p>
            <p className="up-endereco-desc">Rua das Flores, 142 - Meireles, Fortaleza - CE, 60165-060</p>
          </div>
          <button className="up-btn-icon"><span className="material-symbols-outlined">edit</span></button>
        </div>
        <button className="up-adicionar-btn"><span className="material-symbols-outlined">add_location_alt</span> Adicionar novo endereço</button>
      </div>
    )

    if (s === 'pedidos') return (
      <div className="up-content-inner">
        <h2 className="up-content-title">Pedidos</h2>
        {PEDIDOS.map(p => (
          <div key={p.num} className="up-pedido-row">
            <div className="up-pedido-icon"><span className="material-symbols-outlined">medication</span></div>
            <div className="up-pedido-info">
              <p className="up-pedido-nome">{p.nome} · {p.farmacia}</p>
              <p className="up-pedido-sub">{p.data} · {p.itens} {p.itens === 1 ? 'item' : 'itens'} · R$ {p.valor.toFixed(2).replace('.', ',')}</p>
            </div>
            <span className={`badge-status ${STATUS_CLASS[p.status]}`}>{STATUS_LABEL[p.status]}</span>
          </div>
        ))}
      </div>
    )

    if (s === 'cartoes') return (
      <div className="up-content-inner">
        <h2 className="up-content-title">Cartões</h2>
        {[
          { nome: 'Visa · final 4521', detalhe: '**** 4521 · Val. 08/27', principal: true },
          { nome: 'Mastercard · final 8834', detalhe: '**** 8834 · Val. 02/26', principal: false },
        ].map((c, i) => (
          <div key={i} className="up-endereco-card">
            <span className="material-symbols-outlined up-item-icon">credit_card</span>
            <div className="up-endereco-info">
              <p className="up-endereco-titulo">{c.nome} {c.principal && <span className="up-badge-principal">Principal</span>}</p>
              <p className="up-endereco-desc">{c.detalhe}</p>
            </div>
            <button className="up-btn-icon"><span className="material-symbols-outlined">edit</span></button>
          </div>
        ))}
        <button className="up-adicionar-btn"><span className="material-symbols-outlined">add_card</span> Adicionar novo cartão</button>
      </div>
    )


    if (s === 'favoritos') return (
      <div className="up-content-inner">
        <h2 className="up-content-title">Favoritos</h2>
        {favoritos.length === 0 ? (
          <div className="up-fav-empty">
            <span className="material-symbols-outlined up-fav-empty-icon">favorite_border</span>
            <p className="up-fav-empty-title">Nenhum favorito ainda</p>
            <p className="up-fav-empty-sub">Toque no coração de qualquer produto para salvá-lo aqui.</p>
            <Link to="/categoria" className="up-fav-btn">Explorar produtos</Link>
          </div>
        ) : (
          <div className="up-fav-grid">
            {favoritos.map(p => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        )}
      </div>
    )

    if (s === 'config') return (
      <div className="up-content-inner">
        <h2 className="up-content-title">Configurações</h2>
        {[
          { icon: 'notifications', label: 'Notificações por e-mail',     desc: 'Receba atualizações dos seus pedidos' },
          { icon: 'sms',           label: 'Notificações por SMS',        desc: 'Alertas sobre entrega e promoções' },
          { icon: 'local_offer',   label: 'Ofertas personalizadas',      desc: 'Promoções baseadas no seu histórico' },
        ].map((c, i) => (
          <div key={i} className="up-config-row">
            <span className="material-symbols-outlined up-item-icon">{c.icon}</span>
            <div className="up-config-text">
              <p className="up-config-label">{c.label}</p>
              <p className="up-config-desc">{c.desc}</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked={i === 0} />
              <span className="toggle-slider" />
            </label>
          </div>
        ))}
      </div>
    )

    if (s === 'parceiro') {
      const CAMPOS = [
        { name: 'nome',        label: 'Nome da farmácia',    type: 'text',  placeholder: 'Ex: Farmácia Central' },
        { name: 'cnpj',        label: 'CNPJ',                type: 'text',  placeholder: '00.000.000/0001-00' },
        { name: 'telefone',    label: 'Telefone / WhatsApp', type: 'tel',   placeholder: '(85) 9 9999-9999' },
        { name: 'email',       label: 'E-mail',              type: 'email', placeholder: 'contato@farmacia.com' },
        { name: 'endereco',    label: 'Endereço',            type: 'text',  placeholder: 'Rua, número, bairro' },
        { name: 'cidade',      label: 'Cidade / Estado',     type: 'text',  placeholder: 'Ex: Tauá, CE' },
        { name: 'responsavel', label: 'Responsável técnico', type: 'text',  placeholder: 'Nome do farmacêutico' },
        { name: 'crf',         label: 'CRF',                 type: 'text',  placeholder: 'Número do CRF' },
      ]
      const BENEFICIOS = [
        { icon: 'trending_up',    titulo: 'Mais vendas',       desc: 'Aumente seu alcance local e venda para clientes que ainda não conhecem sua farmácia.' },
        { icon: 'local_shipping', titulo: 'Entregas rápidas',  desc: 'Infraestrutura de entrega já pronta. Você foca em vender, a gente cuida do resto.' },
        { icon: 'payments',       titulo: 'Repasse rápido',    desc: 'Receba o valor das suas vendas em até 2 dias úteis, direto na conta da farmácia.' },
        { icon: 'bar_chart',      titulo: 'Relatórios',        desc: 'Acompanhe vendas, pedidos e desempenho em tempo real pelo painel administrativo.' },
      ]

      if (parceiroEnviado) return (
        <div className="up-content-inner">
          <div className="parceiro-sucesso">
            <span className="material-symbols-outlined parceiro-sucesso-icon">check_circle</span>
            <h2>Cadastro enviado!</h2>
            <p>Nossa equipe vai analisar suas informações e entrar em contato em até 2 dias úteis.</p>
          </div>
        </div>
      )

      if (parceiroCadastro) return (
        <div className="up-content-inner">
          <h2 className="up-content-title">Cadastro de farmácia</h2>
          <p className="parceiro-sub">Preencha os dados abaixo e nossa equipe entrará em contato.</p>
          <div className="parceiro-form">
            {CAMPOS.map(c => (
              <div key={c.name} className="parceiro-field">
                <label>{c.label}</label>
                <input
                  type={c.type}
                  name={c.name}
                  placeholder={c.placeholder}
                  value={parceiroForm[c.name] ?? ''}
                  onChange={e => setParceiroForm(p => ({ ...p, [e.target.name]: e.target.value }))}
                />
              </div>
            ))}
            <div className="parceiro-field">
              <label>Horário de funcionamento</label>
              <textarea
                name="horario"
                placeholder="Ex: Seg–Sex 8h–20h, Sáb 8h–14h"
                rows={3}
                value={parceiroForm.horario ?? ''}
                onChange={e => setParceiroForm(p => ({ ...p, horario: e.target.value }))}
              />
            </div>
            <button className="parceiro-btn" onClick={() => setParceiroEnviado(true)}>
              <span className="material-symbols-outlined">send</span>
              Enviar cadastro
            </button>
            <button className="parceiro-btn-voltar" onClick={() => setParceiroCadastro(false)}>
              Voltar
            </button>
          </div>
        </div>
      )

      return (
        <div className="up-content-inner">
          <div className="parceiro-hero">
            <img src="/img/weiva/icon.png" alt="Weiva" className="parceiro-hero-icon" />
            <h1>Cadastre sua farmácia na Weiva!</h1>
            <p>Leve seus produtos a milhares de clientes na região. Rápido, simples e sem burocracia.</p>
          </div>
          <div className="parceiro-beneficios">
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
          </div>
          <div className="parceiro-cta">
            <button className="parceiro-btn" onClick={() => setParceiroCadastro(true)}>
              <span className="material-symbols-outlined">storefront</span>
              Quero ser parceiro
            </button>
            <p className="parceiro-cta-sub">Gratuito para começar. Sem taxas de adesão.</p>
          </div>
        </div>
      )
    }

    return null
  }

  /* ─── MOBILE: lista principal ─── */
  const MobileLista = () => (
    <>
      <header className="perfil-header-top">
        <button className="perfil-back" onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1>Conta</h1>
      </header>
      <div className="perfil-hero">
        <div className="perfil-avatar-wrap">
          <img src="/img/weiva/default-avatar.jpg" alt="avatar" className="perfil-avatar" />
        </div>
        <p className="perfil-nome">Usuario</p>
      </div>
      <div className="perfil-lista">
        <p className="perfil-grupo-label">MINHA CONTA</p>
        {MENU.map(m => (
          <button key={m.id} className="perfil-item" onClick={() => setMobileSub(m.id)}>
            <span className="material-symbols-outlined perfil-item-icon">{m.icon}</span>
            <span className="perfil-item-label">{m.label}</span>
            <span className="material-symbols-outlined perfil-chevron">chevron_right</span>
          </button>
        ))}
        <p className="perfil-grupo-label">NEGÓCIOS</p>
        <button className="perfil-item destaque" onClick={() => setMobileSub('parceiro')}>
          <span className="material-symbols-outlined perfil-item-icon">storefront</span>
          <span className="perfil-item-label">Seja um parceiro</span>
          <span className="material-symbols-outlined perfil-chevron">chevron_right</span>
        </button>
        <div className="perfil-divisor" />
        <button className="perfil-item sair" onClick={() => navigate('/login')}>
          <span className="material-symbols-outlined perfil-item-icon">logout</span>
          <span className="perfil-item-label">Sair</span>
          <span className="material-symbols-outlined perfil-chevron">chevron_right</span>
        </button>
      </div>
      <NavMobileBottom />
    </>
  )

  /* ─── MOBILE: subpágina ─── */
  const MobileSub = () => (
    <>
      <header className="perfil-header-top">
        <button className="perfil-back" onClick={() => setMobileSub(null)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1>{MENU.find(m => m.id === mobileSub)?.label ?? 'Conta'}</h1>
      </header>
      <div className="up-mobile-sub-wrap"><Conteudo /></div>
      <NavMobileBottom />
    </>
  )

  return (
    <>
      {/* ══════════ DESKTOP ══════════ */}
      <div className="up-desktop">
        <Header />

        {/* Topo: avatar + nome + editar foto */}
        <div className="up-top-bar">
          <div className="up-top-inner">
            <img src="/img/weiva/default-avatar.jpg" alt="avatar" className="up-top-avatar" />
            <p className="up-top-nome">Usuario</p>
            <button className="up-editar-foto-btn">
              <span className="material-symbols-outlined">edit</span>
              Editar foto
            </button>
          </div>
        </div>

        {/* Layout 2 colunas */}
        <div className="up-layout">

          {/* SIDEBAR */}
          <aside className="up-sidebar">
            {MENU.map(m => (
              <button
                key={m.id}
                className={`up-sidebar-item ${secao === m.id ? 'ativo' : ''}`}
                onClick={() => setSecao(m.id)}
              >
                <span className="material-symbols-outlined">{m.icon}</span>
                {m.label}
              </button>
            ))}
            <hr className="up-sidebar-hr" />
            <button className="up-sidebar-item destaque" onClick={() => setSecao('parceiro')}>
              <span className="material-symbols-outlined">storefront</span>
              Seja um parceiro
            </button>
            <hr className="up-sidebar-hr" />
            <button className="up-sidebar-item sair" onClick={() => navigate('/login')}>
              <span className="material-symbols-outlined">logout</span>
              Sair
            </button>
          </aside>

          {/* CONTEÚDO */}
          <main className="up-main">
            <Conteudo />
          </main>
        </div>
      </div>

      {/* ══════════ MOBILE ══════════ */}
      <div className="up-mobile">
        {mobileSub ? <MobileSub /> : <MobileLista />}
      </div>
    </>
  )
}
