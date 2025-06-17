// filepath: c:\Users\ramos\Downloads\Sesi-Senai\Front-end-estacionamento\front-estacionamento\src\containers\Home\index.jsx
import { useEffect, useState } from 'react';
import api from '../../services/api';
import Header from '../../components/Header';
import {
  Container,
  Secao,
  Titulo,
  CaixaInfo,
  Formulario,
  Input,
  Botao,
  Lista,
  ItemLista,
  Mensagem
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
      setMensagem('Erro ao carregar dados.');
    }
  }

  async function registrarEntrada(e) {
    e.preventDefault();
    setMensagem('');
    if (!placaEntrada) {
      setMensagem('Informe a placa para registrar a entrada.');
      return;
    }
    if (vagasOcupadas >= totalVagas) {
      setMensagem('Não há vagas disponíveis.');
      return;
    }
    try {
      const respostaVeiculo = await api.get(`/veiculo/placa?placa=${placaEntrada}`);
      if (!respostaVeiculo.data.length) {
        setMensagem('Veículo não encontrado.');
        return;
      }
      const veiculoId = respostaVeiculo.data[0].id;

      await api.post('/registrar', {
        veiculoId,
        data_hora: new Date().toISOString() // Envia a data de entrada
      });

      setMensagem('Entrada registrada com sucesso!');
      setPlacaEntrada('');
      buscarDados();
    } catch (error) {
      setMensagem(error.response?.data?.mensagem || 'Erro ao registrar entrada.');
    }
  }

  async function registrarSaida(e) {
    e.preventDefault();
    setMensagem('');
    if (!placaSaida) {
      setMensagem('Informe a placa para registrar a saída.');
      return;
    }
    try {
      const respostaVeiculo = await api.get(`/veiculo/placa?placa=${placaSaida}`);
      if (!respostaVeiculo.data.length) {
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

      await api.post(`/saida/${acessoAberto.id}`, {
        data_saida: new Date().toISOString() // Envia a data de saída
      });

      setMensagem('Saída registrada com sucesso!');
      setPlacaSaida('');
      buscarDados();
    } catch (error) {
      setMensagem('Erro ao registrar saída.');
    }
  }

  function alterarTotalVagas(e) {
    const valor = Number(e.target.value);
    if (valor >= 0) {
      setTotalVagas(valor);
    }
  }

  return (
    <>
      <Header />
      <Container>
        <Secao>
          <Titulo>Controle de Vagas</Titulo>
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
        </Secao>

        <Secao>
          <Titulo>Registrar Entrada</Titulo>
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
          <Titulo>Registrar Saída</Titulo>
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

        {mensagem && <Mensagem>{mensagem}</Mensagem>}

        <Secao>
          <Titulo>Últimas Entradas</Titulo>
          <Lista>
            {ultimasEntradas.length === 0 && <ItemLista>Nenhuma entrada registrada.</ItemLista>}
            {ultimasEntradas.map((item) => (
              <ItemLista key={item.id}>
                Veículo ID: {item.veiculoId} - Entrada: {new Date(item.data_hora).toLocaleString()}
              </ItemLista>
            ))}
          </Lista>
        </Secao>

        <Secao>
          <Titulo>Últimas Saídas</Titulo>
          <Lista>
            {ultimasSaidas.length === 0 && <ItemLista>Nenhuma saída registrada.</ItemLista>}
            {ultimasSaidas.map((item) => (
              <ItemLista key={item.id}>
                Veículo ID: {item.veiculoId} - Saída: {new Date(item.data_saida).toLocaleString()}
              </ItemLista>
            ))}
          </Lista>
        </Secao>
      </Container>
    </>
  );
}

export default Home;