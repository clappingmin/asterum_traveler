import styled from 'styled-components';
import { TestButton } from '@asterum/ui';
import { Report } from '@asterum/types';

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
