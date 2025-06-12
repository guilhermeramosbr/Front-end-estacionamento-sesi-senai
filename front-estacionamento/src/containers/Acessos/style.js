import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    border-color: #2980b9;
    outline: none;
  }
`;

export const Button = styled.button`
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

export const SubTitle = styled.h3`
  margin-top: 32px;
  margin-bottom: 12px;
  color: #1f3c88;
  font-size: 1.2rem;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 24px;
`;

export const ListItem = styled.li`
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  font-size: 1rem;
`;

export const Mensagem = styled.p`
  margin-top: 16px;
  color: ${({ erro }) => (erro ? '#e74c3c' : '#27ae60')};
  font-weight: 500;
  text-align: center;
`;