import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Cadastro.css'

function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const handleCadastro = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3000/usuarios', { nome, email, senha })
      alert('Usuário cadastrado com sucesso!')
      navigate('/')
    } catch (error) {
      alert('Erro ao cadastrar. Verifique os dados.')
    }
  }

  return (
    <div className="cadastro-container">
      <form onSubmit={handleCadastro} className="cadastro-form">
        <h2 className="cadastro-title">Cadastro de Usuário</h2>

        <label>Nome</label>
        <input
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          placeholder="Digite seu nome"
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Digite seu email"
          required
        />

        <label>Senha</label>
        <input
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          placeholder="Digite sua senha"
          required
        />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  )
}

export default Cadastro
