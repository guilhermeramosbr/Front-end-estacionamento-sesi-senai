import { useState } from 'react';
import api from '../../services/api';
import Header from '../../components/Header';
import {
  Container,
  Title,
  SubTitle,
  Formulario,
  Input,
  Botao,
  Mensagem
} from './style';

function Cadastro() {
  const [carro, setCarro] = useState({ modelo: '', placa: '', cor: '' });
  const [motorista, setMotorista] = useState({ nome: '', documento: '', email: '', senha: '' });
  const [mensagem, setMensagem] = useState('');

  const handleCarroChange = (e) => {
    const { name, value } = e.target;
    setCarro({ ...carro, [name]: value });
  };

  const handleMotoristaChange = (e) => {
    const { name, value } = e.target;
    setMotorista({ ...motorista, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    try {
      
      await api.post('/usuario', {
        nome: motorista.nome,
        email: motorista.email,
        senha: motorista.senha,
        documento: motorista.documento
      });
      // O backend retorna só mensagem, então busque o usuário pelo email para pegar o id
      const usuarios = await api.get('/usuarios');
      const usuarioCriado = usuarios.data.find(u => u.email === motorista.email);
      if (!usuarioCriado) {
        setMensagem('Usuário criado, mas não encontrado na listagem.');
        return;
      }
      const usuarioId = usuarioCriado.id;

      await api.post('/veiculo', { ...carro, usuarioId });

      setMensagem('Carro e motorista registrados com sucesso!');
      setCarro({ modelo: '', placa: '', cor: '' });
      setMotorista({ nome: '', documento: '', email: '', senha: '' });
    } catch (error) {
      setMensagem('Erro ao registrar: ' + (error.response?.data?.mensagem || 'Erro desconhecido.'));
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Title>Registrar Carro e Motorista</Title>
        <Formulario onSubmit={handleSubmit}>
          <SubTitle>Dados do Motorista</SubTitle>
          <Input
            type="text"
            name="nome"
            placeholder="Nome do Motorista"
            value={motorista.nome}
            onChange={handleMotoristaChange}
            required
          />
          <Input
            type="text"
            name="documento"
            placeholder="Documento do Motorista"
            value={motorista.documento}
            onChange={handleMotoristaChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={motorista.email}
            onChange={handleMotoristaChange}
            required
          />
          <Input
            type="password"
            name="senha"
            placeholder="Senha"
            value={motorista.senha}
            onChange={handleMotoristaChange}
            required
          />
          <SubTitle>Dados do Carro</SubTitle>
          <Input
            type="text"
            name="modelo"
            placeholder="Modelo do Carro"
            value={carro.modelo}
            onChange={handleCarroChange}
            required
          />
          <Input
            type="text"
            name="placa"
            placeholder="Placa do Carro"
            value={carro.placa}
            onChange={handleCarroChange}
            required
          />
          <Input
            type="text"
            name="cor"
            placeholder="Cor do Carro"
            value={carro.cor}
            onChange={handleCarroChange}
            required
          />
          <Botao type="submit">Registrar</Botao>
        </Formulario>
        {mensagem && <Mensagem>{mensagem}</Mensagem>}
      </Container>
    </>
  );
}

export default Cadastro;