import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import './ParceiroBeneficiosPage.css'
import NavMobileBottom from '../components/NavMobileBottom.jsx'

const CAMPOS = [
  { name: 'nome',      label: 'Nome da farmácia',     type: 'text',  placeholder: 'Ex: Farmácia Central' },
  { name: 'cnpj',      label: 'CNPJ',                 type: 'text',  placeholder: '00.000.000/0001-00' },
  { name: 'telefone',  label: 'Telefone / WhatsApp',  type: 'tel',   placeholder: '(85) 9 9999-9999' },
  { name: 'email',     label: 'E-mail',               type: 'email', placeholder: 'contato@farmacia.com' },
  { name: 'endereco',  label: 'Endereço',             type: 'text',  placeholder: 'Rua, número, bairro' },
  { name: 'cidade',    label: 'Cidade / Estado',      type: 'text',  placeholder: 'Ex: Tauá, CE' },
  { name: 'responsavel', label: 'Responsável técnico', type: 'text', placeholder: 'Nome do farmacêutico' },
  { name: 'crf',       label: 'CRF',                  type: 'text',  placeholder: 'Número do CRF' },
]

export default function ParceiroCadastroPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({})
  const [enviado, setEnviado] = useState(false)

  function handleChange(e) {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setEnviado(true)
  }

  if (enviado) return (
    <>
      <Header showBack />
      <div className="parceiro-sucesso">
        <span className="material-symbols-outlined parceiro-sucesso-icon">check_circle</span>
        <h2>Cadastro enviado!</h2>
        <p>Nossa equipe vai analisar suas informações e entrar em contato em até 2 dias úteis.</p>
        <button className="parceiro-btn" onClick={() => navigate('/')}>Voltar para o início</button>
      </div>
      <NavMobileBottom />
    </>
  )

  return (
    <>
      <Header showBack />

      <main className="parceiro-page">
        <section className="parceiro-cadastro-header">
          <h1>Cadastro de farmácia</h1>
          <p>Preencha os dados abaixo e nossa equipe entrará em contato.</p>
        </section>

        <form className="parceiro-form" onSubmit={handleSubmit}>
          {CAMPOS.map(c => (
            <div key={c.name} className="parceiro-field">
              <label>{c.label}</label>
              <input
                type={c.type}
                name={c.name}
                placeholder={c.placeholder}
                value={form[c.name] ?? ''}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="parceiro-field">
            <label>Horário de funcionamento</label>
            <textarea
              name="horario"
              placeholder="Ex: Seg–Sex 8h–20h, Sáb 8h–14h"
              rows={3}
              value={form.horario ?? ''}
              onChange={handleChange}
            />
          </div>

          <button className="parceiro-btn" type="submit">
            <span className="material-symbols-outlined">send</span>
            Enviar cadastro
          </button>
        </form>
      </main>

      <NavMobileBottom />
    </>
  )
}
