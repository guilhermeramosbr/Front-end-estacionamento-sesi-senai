import { useEffect, useState } from 'react';
import api from '../../services/api';
import {
  Container,
  Title,
  Form,
  Input,
  Button,
  SubTitle,
  List,
  ListItem,
  Mensagem
} from './style';

function Acesso() {
  const [placa, setPlaca] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);
  const [acessos, setAcessos] = useState([]);
  const [saidas, setSaidas] = useState([]);

  useEffect(() => {
    async function fetchAcessos() {
      const resAcessos = await api.get('/listar');
      setAcessos(resAcessos.data);
      const resSaidas = await api.get('/saidas');
      setSaidas(resSaidas.data);
    }
    fetchAcessos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro(false);
    try {
      const respostaVeiculo = await api.get(`/veiculo?placa=${placa}`);
      if (respostaVeiculo.data.length === 0) {
        setMensagem('Veículo não encontrado.');
        setErro(true);
        return;
      }
      const veiculoId = respostaVeiculo.data[0].id;
      await api.post('/registrar', { veiculoId });
      setMensagem('Acesso registrado com sucesso!');
      setErro(false);
      setPlaca('');
      // Atualiza listas após registrar
      const resAcessos = await api.get('/listar');
      setAcessos(resAcessos.data);
      const resSaidas = await api.get('/saidas');
      setSaidas(resSaidas.data);
    } catch (error) {
      setMensagem('Erro ao registrar acesso.');
      setErro(true);
    }
  };

  return (
    <Container>
      <Title>Registrar Acesso</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Placa do veículo"
          value={placa}
          onChange={(e) => setPlaca(e.target.value.toUpperCase())}
          required
        />
        <Button type="submit">Registrar</Button>
      </Form>
      {mensagem && <Mensagem erro={erro}>{mensagem}</Mensagem>}

      <SubTitle>Últimos Acessos</SubTitle>
      <List>
        {acessos.map(acesso => (
          <ListItem key={acesso.id}>
            {acesso.placa} - {new Date(acesso.dataHoraEntrada).toLocaleString()}
          </ListItem>
        ))}
      </List>

      <SubTitle>Últimas Saídas</SubTitle>
      <List>
        {saidas.map(saida => (
          <ListItem key={saida.id}>
            {saida.placa} - {new Date(saida.dataHoraSaida).toLocaleString()}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Acesso;