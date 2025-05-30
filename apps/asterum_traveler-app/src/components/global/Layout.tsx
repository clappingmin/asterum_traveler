import 'reset-css';
import '@/styles/global.css';
import { ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@asterum/ui';
import debounce from 'lodash/debounce';

/**
 * 화면 크기가 변경됐을 때
 * @return
 */
const handleResize = (wrapperRef: React.RefObject<HTMLDivElement>) => {
  const pageWrapper = wrapperRef.current;
  if (!pageWrapper) return;

  const zoomSize = window.innerWidth / 1920;
  const revertSize = 1920 / window.innerWidth;
  const isMobile = window.screen.width < 768;

  pageWrapper.style.zoom = String(zoomSize);
  pageWrapper.style.height =
    pageWrapper.clientWidth === 1920 && isMobile ? '100vh' : `calc(100vh * ${revertSize})`;
};

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    handleResize(wrapperRef);
    const handleResizeEvent = debounce(() => handleResize(wrapperRef), 200);
    window.addEventListener('resize', handleResizeEvent);

    return () => {
      window.removeEventListener('resize', handleResizeEvent);
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Wrapper ref={wrapperRef} className="scrollbar" id="scrollRoot">
        <Header scrollTarget={wrapperRef} />
        <Container>
          <PageContainer>{children}</PageContainer>
          <Footer />
        </Container>
      </Wrapper>
    </ChakraProvider>
  );
}

const Wrapper = styled.div`
  background-color: #000;
  width: 1920px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PageContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`;

export default Layout;
