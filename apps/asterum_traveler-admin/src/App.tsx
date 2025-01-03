import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useMatch } from 'react-router-dom';
import styled from 'styled-components';

function App() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('Dashboard Overview');

  useEffect(() => {
    changePageTitle(location.pathname);
  }, [location]);

  const changePageTitle = (path: string) => {
    if (path === '/') setPageTitle('Dashboard Overview');
    else if (path.startsWith('/report')) setPageTitle('Report Overview');
    else setPageTitle('Page');
  };

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
        <DecoBox />
        <PageTopContainer>
          <PageTitle>{pageTitle}</PageTitle>
          <SearchBar placeholder="Search for anything"></SearchBar>
        </PageTopContainer>
        <RouterBox>
          <Outlet />
        </RouterBox>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background: #111219;
  overflow-x: hidden;
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
  position: relative;
  padding: 30px;
`;

const DecoBox = styled.div`
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  background: var(--main);
  filter: brightness(50%);
`;

const PageTopContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PageTitle = styled.div`
  color: var(--color);
  font-size: 28px;
  font-weight: 500;
  line-height: normal;
`;

const SearchBar = styled.input`
  width: 400px;
  border-radius: 11px;
  background: linear-gradient(270deg, rgba(0, 0, 0, 0.5) 0.09%, rgba(0, 0, 0, 0.5) 88.52%);
  backdrop-filter: blur(20.067087173461914px);
  border: none;
  outline: none;
  padding: 15px;
  color: var(--color);
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;

  &::placeholder {
    color: var(--label);
  }
`;

const RouterBox = styled.div`
  margin-top: 45px;
  width: 100%;
  position: relative;
  border-radius: 15px;
  background: var(--black, linear-gradient(153deg, #000 18.75%, rgba(0, 0, 0, 0) 100%));
  backdrop-filter: blur(20px);
  padding: 22px;
`;

export default App;
