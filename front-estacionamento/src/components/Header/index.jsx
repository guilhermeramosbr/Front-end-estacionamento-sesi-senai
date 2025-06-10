
import Logo from '../../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';

import { Container, Li, Menu } from './styles';
function Header(){

    const { pathname } = useLocation();

    return(
        <Container>
            <img src={Logo} alt='Logo_SENAI' />
            <Menu>
                <Li isActive={pathname === '/'}>
                    <Link to="/">Home</Link>
                </Li>
                <Li isActive={pathname.includes('/cadastro')}>
                    <Link to="/cadastro" >Cadastro</Link>
                </Li>
                <Li isActive={pathname.includes('/login')}> 
                    <Link to="/login" >Login</Link>
                </Li>
                 <Li isActive={pathname.includes('/acessos')}> 
                    <Link to="/acessos" >Acessos</Link>
                </Li>

            </Menu>
        </Container>
    )
}

export default Header;