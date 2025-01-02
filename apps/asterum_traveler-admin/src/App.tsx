import { Link, Outlet, useMatch } from 'react-router-dom';
import styled from 'styled-components';

function App() {
  return (
    <Wrapper>
      <Navigation>
        <Title>ASTERUM TRAVELER</Title>
        <Label>MENU</Label>
        <MenuBox>
          <Menu to={'/'} isSelected={!!useMatch('/')}>
            Overview
          </Menu>
          <Menu to={'/report'} isSelected={!!useMatch('/report/*')}>
            Report
          </Menu>
          <Menu to={'/'}>Dear</Menu>
          <Menu to={'/'}>Schedule</Menu>
        </MenuBox>
      </Navigation>
      <Container>
        <Outlet />
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background: #111219;
`;

const Navigation = styled.div`
  flex: 0 0 340px;

  height: 100%;
  border-right: 0.97px solid #323232;
  padding: 40px;
`;

const Title = styled.span`
  color: #dadada;
  font-size: 24px;
  font-weight: 450;
`;

const Label = styled.div`
  margin-top: 70px;
  color: var(--label);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.666px;
`;

const MenuBox = styled.div`
  margin-top: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

interface MenuProps {
  isSelected?: boolean;
}

const Menu = styled(Link)<MenuProps>`
  color: ${(props) => (props.isSelected ? 'var(--black)' : 'var(--label)')};
  font-size: 16px;
  font-weight: ${(props) => (props.isSelected ? 700 : 400)};
  line-height: 140%;
  padding: 16px;
  border-radius: 4px;
  background: ${(props) => (props.isSelected ? 'var(--main)' : '')};
  text-decoration: none;
`;

const Container = styled.div`
  flex: 1 1 auto;
`;

export default App;
