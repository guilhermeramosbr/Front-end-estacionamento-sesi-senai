import { Container, DivVagas } from './style';

function Home() {
    const Vagas = 10
    return (
        <Container>
            <Header />
            <DivVagas>
                <h2>Quantidade de Vagas:{Vagas}</h2>
            </DivVagas>

        </Container>
    )
}
export default Home;