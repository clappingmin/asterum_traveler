import styled from 'styled-components';

function Header() {
  return <Wrapper>헤더</Wrapper>;
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;

export default Header;
