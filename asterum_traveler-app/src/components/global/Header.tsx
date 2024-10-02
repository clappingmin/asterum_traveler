import styled from 'styled-components';
import LogoLarge from '../../assets/images/logos/logo_large.svg';

function Header() {
  return (
    <Wrapper>
      <Container>
        <Logo src={LogoLarge} height="64" />
        <NavButton>REPORT</NavButton>
        <NavButton>SCHEDULE</NavButton>
        <NavButton>DEAR.</NavButton>
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
