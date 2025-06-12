import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
`;

export const SubTitle = styled.h3`
  font-size: 1.2rem;
  margin: 18px 0 8px 0;
  color: #1f3c88;
`;

export const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

export const Botao = styled.button`
  padding: 10px 0;
  background: #2980b9;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #1c5d8c;
  }
`;

export const Mensagem = styled.p`
  margin-top: 15px;
  color: #e74c3c;
  text-align: center;
`;