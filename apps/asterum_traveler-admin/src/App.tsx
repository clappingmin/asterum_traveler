import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

function App() {
  return (
    <Wrapper>
      <Navigation>
        <Link to="/report">리포트 페이지로</Link>
      </Navigation>
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: pink;
`;

const Navigation = styled.div`
  width: 300px;
  height: 100%;
  border: 1px solid red;
`;

export default App;
