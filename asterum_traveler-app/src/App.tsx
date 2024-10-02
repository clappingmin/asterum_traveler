import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/global/Header';
import Footer from './components/global/Footer';

function App() {
  return (
    <Wrapper>
      <Header />
      <Container>
        <PageContainer>
          <Outlet />
        </PageContainer>
        <Footer />
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
`;

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const PageContainer = styled.div`
  flex: 1 0 auto;
`;

export default App;
