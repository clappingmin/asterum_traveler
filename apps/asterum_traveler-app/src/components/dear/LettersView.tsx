import { styled } from 'styled-components';
import Card from './Card';

function LettersView() {
  return (
    <Wrapper>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

export default LettersView;
