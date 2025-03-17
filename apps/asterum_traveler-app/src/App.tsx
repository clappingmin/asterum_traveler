import { Outlet } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@asterum/ui';
import Layout from './pages/Layout';
import SEOMetaTag from './components/global/SEOMetaTag';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <SEOMetaTag />
      <Layout>
        <Outlet />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
