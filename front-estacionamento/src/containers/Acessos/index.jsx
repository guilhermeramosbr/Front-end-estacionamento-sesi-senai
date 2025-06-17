import { useEffect, useState } from 'react';
import api from '../../services/api';
import Header from '../../components/Header';
import {
  Container,
  Title,
  SubTitle,
  List,
  ListItem
} from './style';

function Acesso() {
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

  return (
    <>
      <Header />
      <Container>
        <Title>Últimos Acessos</Title>
        <List>
          {acessos.map(acesso => (
            <ListItem key={acesso.id}>
              {acesso.placa
                ? `${acesso.placa} - `
                : ''}
              {acesso.dataHoraEntrada
                ? new Date(acesso.dataHoraEntrada).toLocaleString()
                : acesso.data_hora
                  ? new Date(acesso.data_hora).toLocaleString()
                  : ''}
            </ListItem>
          ))}
        </List>

        <SubTitle>Últimas Saídas</SubTitle>
        <List>
          {saidas.map(saida => (
            <ListItem key={saida.id}>
              {saida.placa
                ? `${saida.placa} - `
                : ''}
              {saida.dataHoraSaida
                ? new Date(saida.dataHoraSaida).toLocaleString()
                : saida.data_saida
                  ? new Date(saida.data_saida).toLocaleString()
                  : ''}
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}

export default Acesso;