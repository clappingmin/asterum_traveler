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
  width: 100vw;
  height: 100vh;
  background-color: pink;
`;

export default App;
