import styled from 'styled-components';
import dearNoahImg from '@/assets/images/member/dear_noah.png';
import WriteLetterButton from '@/components/dear/WriteLetterButton';
import LettersView from '@/components/dear/LettersView';
import FetchErrorBoundary from '@/components/global/error/FetchErrorBoundary';
import { useState } from 'react';

function DearPage() {
  const [refetchFn, setRefetchFn] = useState<(() => Promise<any>) | null>(null);

  return (
    <Wrapper>
      <TitleContainer>
        <Title>DEAR.</Title>
        <Noah width={700} height={524} src={dearNoahImg} />
      </TitleContainer>
      <WriteButtonWrapper>
        <WriteLetterButton />
      </WriteButtonWrapper>
      <FetchErrorBoundary onRetry={() => refetchFn && refetchFn()}>
        <LettersView onRefetch={setRefetchFn} />
      </FetchErrorBoundary>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: var(--width);
  margin: var(--header-height) auto;
  user-select: none;
`;

const TitleContainer = styled.div`
  position: relative;
  margin: auto;
  width: var(--width);
  padding-top: 64px;
  padding-bottom: 128px;
`;

const Title = styled.div`
  color: var(--dear);
  font-family: 'PartialSansKR' !important;
  font-size: 200px;
  font-weight: 400;
  line-height: 120%;
`;

const Noah = styled.img`
  position: absolute;
  bottom: 0;
  left: 1060px;
  width: 700px;
  height: 524px;
`;

const WriteButtonWrapper = styled.div`
  width: 100%;
  margin: 32px 0;
`;

export default DearPage;
