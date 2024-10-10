import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

function App() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export default App;
