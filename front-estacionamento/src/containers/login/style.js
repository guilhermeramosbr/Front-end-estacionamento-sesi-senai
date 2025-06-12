// filepath: c:\Users\ramos\Downloads\Sesi-Senai\Front-end-estacionamento\front-estacionamento\src\containers\Login\style.js
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

export const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #2980b9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #1f3c88;
  }
`;

export const Mensagem = styled.p`
  margin-top: 15px;
  color: #e74c3c;
  text-align: center;
  font-weight: 500;
`;