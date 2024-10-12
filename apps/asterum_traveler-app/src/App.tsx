import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/global/Header';
import Footer from './components/global/Footer';
import { useEffect, useRef } from 'react';

/**
 * 화면 크기가 변경됐을 때
 * @return
 */
const handleResize = (wrapperRef: React.RefObject<HTMLDivElement>) => {
  if (window.innerWidth > 1920) return;

  const pageWrapper = wrapperRef.current;
  if (!pageWrapper) return;

  const zoomSize = window.innerWidth / 1920;
  const revertSize = 1920 / window.innerWidth;

  pageWrapper.style.zoom = String(zoomSize);
  pageWrapper.style.minHeight = `calc(100vh * ${revertSize})`;
};

function App() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    handleResize(wrapperRef);
    const handleResizeEvent = () => handleResize(wrapperRef);
    window.addEventListener('resize', handleResizeEvent);

    return () => {
      window.removeEventListener('resize', handleResizeEvent);
    };
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
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
  overflow-x: hidden;
  overflow-y: auto;
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
