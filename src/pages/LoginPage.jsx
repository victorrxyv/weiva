import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(false)
  const [animating, setAnimating] = useState(false)
  const navigate = useNavigate()

  const [form, setForm] = useState({ nome: '', email: '', senha: '', endereco: '' })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function toggleForm() {
    setAnimating(true)
    setTimeout(() => {
      setIsLogin(v => !v)
      setAnimating(false)
    }, 300)
  }

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/')
  }

  return (
    <main className="login-main">
      {/* LEFT */}
      <div className="container-left">
        <img src="/img/weiva/logo.png" alt="logo" />
        <h1>O seu caminho para uma <br /> saúde <span>conectada!</span></h1>
        <div className="descr-container">
          <div className="desc">
            <span><i className="fa-solid fa-bag-shopping" /></span>
            <h3><em>Milhares de produtos</em><br />das melhores marcas.</h3>
          </div>
          <div className="desc">
            <span><i className="fa-solid fa-tags" /></span>
            <h3><em>Promoções exclusivas!</em><br />melhores preços.</h3>
          </div>
          <div className="desc">
            <span><i className="fa-solid fa-truck-fast" /></span>
            <h3><em>Mais agilidade</em><br />nas entregas.</h3>
          </div>
          <div className="desc">
            <span><i className="fa-solid fa-user-shield" /></span>
            <h3><em>Segurança garantida</em><br />em todas as etapas.</h3>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="container-right">
        <div className={`form-box ${animating ? 'fade' : ''}`}>
          <h1>{isLogin ? 'Conectar à Weiva!' : 'Cadastre-se na Weiva!'}</h1>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <h5>Nome</h5>
                <input
                  type="text" name="nome" placeholder="Ex: João"
                  value={form.nome} onChange={handleChange}
                />
              </div>
            )}

            <div>
              <h5>Email</h5>
              <input
                type="email" name="email" placeholder="Ex: joao@gmail.com"
                value={form.email} onChange={handleChange} required
              />
            </div>

            <div>
              <h5>Senha</h5>
              <input
                type="password" name="senha" placeholder="********"
                value={form.senha} onChange={handleChange} required
              />
            </div>

            {!isLogin && (
              <div>
                <h5>Endereço</h5>
                <input
                  type="text" name="endereco" placeholder="Ex: Rua das Flores, N° 19"
                  value={form.endereco} onChange={handleChange}
                />
              </div>
            )}

            <button className="login" type="submit">
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </button>

            <div className="divider">
              <div className="line" /><p>OU</p><div className="line" />
            </div>

            <button className="gglogin" type="button">
              <img src="/img/weiva/google.webp" alt="Google" />
              Faça login com Google
            </button>
          </form>

          <div className="toggle">
            {isLogin ? (
              <><p>Não tem uma conta?</p> <a onClick={toggleForm}>Cadastrar</a></>
            ) : (
              <><p>Já tem uma conta?</p> <a onClick={toggleForm}>Acessar</a></>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
