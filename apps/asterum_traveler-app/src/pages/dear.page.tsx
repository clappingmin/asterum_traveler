import styled from 'styled-components';
import dearNoahImg from '@/assets/images/member/dear_noah.png';
import WriteLetterButton from '@/components/dear/WriteLetterButton';
import LettersView from '@/components/dear/LettersView';
import FetchErrorBoundary from '@/components/global/error/FetchErrorBoundary';
import { useState } from 'react';

function Page() {
  const [refetchFn, setRefetchFn] = useState<(() => Promise<unknown>) | null>(null);

  return (
    <Wrapper>
      <TitleContainer>
        <Title>DEAR.</Title>
        <Noah
          width={700}
          height={524}
          src={dearNoahImg}
          alt="ASTERUM TRAVELER Dear 페이지 노아 이미지"
        />
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
  margin: var(--header-height) auto 0;
  user-select: none;
`;

const TitleContainer = styled.div`
  position: relative;
  margin: auto;
  width: var(--width);
  padding-top: 4rem;
  padding-bottom: 8rem;
`;

const Title = styled.div`
  color: var(--dear);
  font-family: 'PartialSansKR' !important;
  font-size: 12.5rem;
  font-weight: 400;
  line-height: 120%;
`;

const Noah = styled.img`
  position: absolute;
  bottom: 0;
  left: 66.25rem;
  width: 43.75rem;
  height: 32.75rem;
`;

const WriteButtonWrapper = styled.div`
  width: 100%;
  margin: 2rem 0;
`;

export { Page };
