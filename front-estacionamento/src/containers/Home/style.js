import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
`;
export const DivVagas = styled.div` 
    display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        h2 {
            color: #333;
            font-size: 24px;
            margin-bottom: 20px;
        }
    `;