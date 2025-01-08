import styled from 'styled-components';
import { TestButton } from '@asterum/ui';

function LandingPage() {
  return (
    <Wrapper>
      Landing
      <TestButton />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 10px solid red;
`;

export default LandingPage;
