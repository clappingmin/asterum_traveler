import styled from 'styled-components';
import dearNoahImg from '../assets/images/member/dear_noah.png';
import WriteLetterButton from '../components/dear/WriteLetterButton';
import LettersView from '../components/dear/LettersView';
import FetchErrorBoundary from '../components/global/error/FetchErrorBoundary';
import { useEffect, useState } from 'react';
import { useMetaStore } from '../store/metaStore';
import metaJson from '../assets/jsons/metaData.json';

function DearPage() {
  const [refetchFn, setRefetchFn] = useState<(() => Promise<any>) | null>(null);

  const { setMetaData } = useMetaStore();

  useEffect(() => {
    setMetaData({
      title: metaJson['/dear'].title,
      description: metaJson['/dear'].description,
      keyword: metaJson['base'].keyword,
      image: metaJson['/dear'].image,
    });
  }, []);

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

export default DearPage;
