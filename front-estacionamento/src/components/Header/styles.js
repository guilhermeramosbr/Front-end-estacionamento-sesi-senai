import styled from "styled-components";

export const Container = styled.div`
background-color: #fff;
z-index: 99;
position: fixed;
top: 0;
display: flex;
padding: 10px 30px;
justify-content: space-between;
align-items: center;

 img{
    width: 30%;
 }
`
export const Menu = styled.ul`
display: flex;
list-style: none;
gap: 50px;
`
export const Li = styled.li`
font-weight: 600;
cursor: pointer;
font-size: 24px;
position: relative;
&::after{
    content: '';
    position: absolute;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 3px;
    background-color: blue;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    transition: width 0.5s ease-in-out;
}
&:hover::after{
    width: 100%;
}

a{
   text-decoration: none;
   color: black;
}
`