import { Outlet } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@asterum/ui';
import Layout from './pages/Layout';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Outlet />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
