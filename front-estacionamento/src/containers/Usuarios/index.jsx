import { useEffect, useState } from 'react';
import api from '../../services/api';
import {
  Container,
  Title,
  UsuarioBox,
  UsuarioNome,
  UsuarioInfo,
  Lista,
  ItemLista
} from './style';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resUsuarios = await api.get('/usuarios');
      const resVeiculos = await api.get('/veiculos');
      setUsuarios(resUsuarios.data);
      setVeiculos(resVeiculos.data);
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Title>Usuários e seus Veículos</Title>
      {usuarios.map(usuario => (
        <UsuarioBox key={usuario.id}>
          <UsuarioNome>{usuario.nome}</UsuarioNome>
          <UsuarioInfo>Email: {usuario.email}</UsuarioInfo>
          <UsuarioInfo>Documento: {usuario.documento}</UsuarioInfo>
          <Lista>
            {veiculos
              .filter(veiculo => veiculo.usuarioId === usuario.id)
              .map(veiculo => (
                <ItemLista key={veiculo.id}>
                  {veiculo.modelo} - {veiculo.placa}
                </ItemLista>
              ))}
          </Lista>
        </UsuarioBox>
      ))}
    </Container>
  );
}

export default Usuarios;