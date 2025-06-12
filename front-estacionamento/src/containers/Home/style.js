import styled from 'styled-components';

export const Container = styled.main`
  max-width: 900px;
  margin: 150px auto;
  padding: 0 1.5rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

export const Secao = styled.section`
  margin-bottom: 3rem;
`;

export const Titulo = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 1.2rem;
  color: #2c3e50;
  font-weight: 700;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-bottom: 3px solid #2980b9;
  padding-bottom: 0.3rem;
  width: fit-content;
`;

export const CaixaInfo = styled.div`
  background-color: #e8f0fe;
  border-radius: 12px;
  padding: 1.5rem 2rem;
  box-shadow: 0 4px 10px rgba(41, 128, 185, 0.15);
  margin-bottom: 2rem;
  p {
    margin: 0.5rem 0;
    font-weight: 600;
    color: #1f3c88;
    font-size: 1.1rem;
  }
`;

export const Lista = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

export const ItemLista = styled.li`
  background-color: #f9fbfd;
  padding: 1rem 1.3rem;
  margin-bottom: 0.9rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(41, 128, 185, 0.1);
  font-size: 1.05rem;
  color: #34495e;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #dbe9fc;
  }
`;

export const Formulario = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  flex: 1 1 200px;
  padding: 0.8rem 1rem;
  font-size: 1.1rem;
  border: 2px solid #2980b9;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #1f3c88;
  }
`;

export const Botao = styled.button`
  padding: 0.8rem 1.8rem;
  background-color: #2980b9;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1f3c88;
  }
`;