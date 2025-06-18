import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Container, Title, Form, Input, Button, Mensagem } from './style';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { email, senha });
      const token = res.data.token;
      localStorage.setItem('token', token); 
      setMessage('Login realizado com sucesso!');
      setTimeout(() => navigate('/home'), 1000);
    } catch {
      setMessage('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <Button type="submit">Entrar</Button>
      </Form>
      {message && <Mensagem>{message}</Mensagem>}
    </Container>
  );
}

export default Login;