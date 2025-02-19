import styled from 'styled-components';
import LogoLarge from '../../assets/images/logos/logo_large.svg';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Wrapper>
      <Container>
        <Link to="/">
          <Logo src={LogoLarge} height="64" />
        </Link>
        <Link to="report">
          <NavButton>REPORT</NavButton>
        </Link>
        <Link to="schedule">
          <NavButton>SCHEDULE</NavButton>
        </Link>
        <Link to="dear">
          <NavButton>DEAR.</NavButton>
        </Link>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;

const Container = styled.div`
  width: var(--width);
  margin: auto;
  display: flex;
  gap: 64px;
  padding: 32px;
`;

const Logo = styled.img`
  height: 64px;
  cursor: pointer;
`;

const NavButton = styled.div`
  font-family: 'PartialSansKR' !important;
  color: var(--color);
  font-size: 32px;
  font-weight: 400;
  line-height: 42px;
  cursor: pointer;
`;

export default Header;
