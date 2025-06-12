// filepath: c:\Users\ramos\Downloads\Sesi-Senai\Front-end-estacionamento\front-estacionamento\src\containers\Home\index.jsx
import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import Header from '../../components/Header';
import {
  Container,
  Secao,
  Titulo,
  Lista,
  ItemLista,
  CaixaInfo,
  Formulario,
  Input,
  Botao
} from './style';

function Home() {
  const [totalVagas, setTotalVagas] = useState(20);
  const [vagasOcupadas, setVagasOcupadas] = useState(0);
  const [ultimasEntradas, setUltimasEntradas] = useState([]);
  const [ultimasSaidas, setUltimasSaidas] = useState([]);

  const [placaEntrada, setPlacaEntrada] = useState('');
  const [placaSaida, setPlacaSaida] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    buscarDados();
  }, []);

  async function buscarDados() {
    try {
      const respostaVagas = await api.get('/presentes');
      setVagasOcupadas(respostaVagas.data.count || 0);

      const respostaEntradas = await api.get('/listar'); 
      const entradasOrdenadas = respostaEntradas.data
        .sort((a, b) => new Date(b.data_hora) - new Date(a.data_hora))
        .slice(0, 5);
      setUltimasEntradas(entradasOrdenadas);

      const respostaSaidas = await api.get('/saidas');
      const saidasOrdenadas = respostaSaidas.data
        .sort((a, b) => new Date(b.data_saida) - new Date(a.data_saida))
        .slice(0, 5);
      setUltimasSaidas(saidasOrdenadas);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setMensagem('Erro ao carregar dados.');
    }
  }

  function alterarTotalVagas(e) {
    const valor = Number(e.target.value);
    if (valor >= 0) {
      setTotalVagas(valor);
    }
  }

  async function registrarEntrada(e) {
    e.preventDefault();
    if (!placaEntrada) {
      setMensagem('Informe a placa para registrar a entrada.');
      return;
    }
    if (vagasOcupadas >= totalVagas) {
      setMensagem('Não há vagas disponíveis.');
      return;
    }
    try {
      const respostaVeiculo = await api.get(`/veiculo?placa=${placaEntrada}`);
      if (respostaVeiculo.data.length === 0) {
        setMensagem('Veículo não encontrado.');
        return;
      }
      const veiculoId = respostaVeiculo.data[0].id;

      await api.post('/registrar', {
        veiculoId,
      });

      setMensagem('Entrada registrada com sucesso!');
      setPlacaEntrada('');
      buscarDados();
    } catch (error) {
      setMensagem(error.response?.data?.mensagem || 'Erro ao registrar entrada.');
      console.error(error);
    }
  }

  async function registrarSaida(e) {
    e.preventDefault();
    if (!placaSaida) {
      setMensagem('Informe a placa para registrar a saída.');
      return;
    }

    try {
      const respostaVeiculo = await api.get(`/veiculo?placa=${placaSaida}`);
      if (respostaVeiculo.data.length === 0) {
        setMensagem('Veículo não encontrado.');
        return;
      }
      const veiculoId = respostaVeiculo.data[0].id;

      const respostaAcessos = await api.get('/listar');
      const acessoAberto = respostaAcessos.data.find(
        (acesso) => acesso.veiculoId === veiculoId && !acesso.data_saida
      );

      if (!acessoAberto) {
        setMensagem('Nenhuma entrada aberta encontrada para esse veículo.');
        return;
      }

      await api.post(`/saida/${acessoAberto.id}`);

      setMensagem('Saída registrada com sucesso!');
      setPlacaSaida('');
      buscarDados();
    } catch (error) {
      setMensagem('Erro ao registrar saída.');
      console.error(error);
    }
  }

  return (
    <>
      <Header />
      <Container>
        <CaixaInfo>
          <p>Total de vagas:</p>
          <Input
            type="number"
            min="0"
            value={totalVagas}
            onChange={alterarTotalVagas}
          />
          <p>Vagas ocupadas: {vagasOcupadas}</p>
        </CaixaInfo>

        <Secao>
          <Titulo>Registrar Entrada pela Placa</Titulo>
          <Formulario onSubmit={registrarEntrada}>
            <Input
              placeholder="Digite a placa"
              value={placaEntrada}
              onChange={(e) => setPlacaEntrada(e.target.value.toUpperCase())}
              maxLength={8}
              required
            />
            <Botao type="submit">Registrar Entrada</Botao>
          </Formulario>
        </Secao>

        <Secao>
          <Titulo>Registrar Saída pela Placa</Titulo>
          <Formulario onSubmit={registrarSaida}>
            <Input
              placeholder="Digite a placa"
              value={placaSaida}
              onChange={(e) => setPlacaSaida(e.target.value.toUpperCase())}
              maxLength={8}
              required
            />
            <Botao type="submit">Registrar Saída</Botao>
          </Formulario>
        </Secao>

        {mensagem && <CaixaInfo><p>{mensagem}</p></CaixaInfo>}

        <Secao>
          <Titulo>Últimas Entradas</Titulo>
          <Lista>
            {ultimasEntradas.length === 0 && <p>Nenhuma entrada registrada.</p>}
            {ultimasEntradas.map((item) => (
              <ItemLista key={item.id}>
                Usuário ID: {item.usuarioId} - Veículo ID: {item.veiculoId} - Entrada: {new Date(item.data_hora).toLocaleString()}
              </ItemLista>
            ))}
          </Lista>
        </Secao>

        <Secao>
          <Titulo>Últimas Saídas</Titulo>
          <Lista>
            {ultimasSaidas.length === 0 && <p>Nenhuma saída registrada.</p>}
            {ultimasSaidas.map((item) => (
              <ItemLista key={item.id}>
                Usuário ID: {item.usuarioId} - Veículo ID: {item.veiculoId} - Saída: {new Date(item.data_saida).toLocaleString()}
              </ItemLista>
            ))}
          </Lista>
        </Secao>
      </Container>
    </>
  );
}

export default Home;