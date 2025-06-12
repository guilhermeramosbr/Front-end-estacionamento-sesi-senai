import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border: 2px solid #2980b9;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #1f3c88;
  }
`;

export const Button = styled.button`
  padding: 0.8rem;
  background-color: #2980b9;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1f3c88;
  }
`;

export const UsuarioBox = styled.div`
  margin-bottom: 24px;
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;
`;

export const UsuarioNome = styled.strong`
  font-size: 1.1rem;
  color: #1f3c88;
`;

export const UsuarioInfo = styled.span`
  display: block;
  color: #555;
  margin-bottom: 2px;
`;

export const Lista = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-top: 8px;
`;

export const ItemLista = styled.li`
  padding: 6px 0;
  color: #34495e;
  font-size: 1rem;
  border-bottom: 1px solid #f0f0f0;
`;