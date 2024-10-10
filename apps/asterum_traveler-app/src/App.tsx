import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { TestButton } from '@asterum/ui';

function App() {
  return (
    <Wrapper>
      <TestButton />
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export default App;
