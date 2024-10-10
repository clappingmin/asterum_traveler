import styled from 'styled-components';
import MemberBox from '../components/report/MemberBox';
import ProductBox from '../components/report/ProductBox';

function ReportLivePage() {
  return (
    <Wrapper>
      <LiveContainer>
        <LiveThumbnail />
        <LiveTitle className="text-overflow-2">
          (ENG/JP/CH/ESP SUB) [하이라이트] 성휘예술고등학교 가을🍂 맞이 체육대회 #2｜#플레이브
          PLAVE｜Plave Highlight Clip
        </LiveTitle>
        <LiveDate>2023년 10월 15일 </LiveDate>
        <LiveMembers>
          <MemberBox member="noah"></MemberBox>
          <MemberBox member="noah"></MemberBox>
          <MemberBox member="noah"></MemberBox>
          <MemberBox member="noah"></MemberBox>
          <MemberBox member="noah"></MemberBox>
        </LiveMembers>
      </LiveContainer>
      <ProductContainer>
        <ProductBox />
        <ProductBox />
        <ProductBox />
      </ProductContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: var(--width);
  margin: var(--header-height) auto;
  padding-top: 64px;
  display: flex;
  align-items: flex-start;
  gap: 64px;
  /* overflow-x: hidden; */
`;

const LiveContainer = styled.div`
  width: 960px;
  flex: 0 0 960px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: calc(var(--header-height) + 64px);
`;

const LiveThumbnail = styled.img`
  width: 100%;
  height: 540px;
  aspect-ratio: 16/9;
  object-fit: contain;
  border-radius: 10px;
`;

const LiveTitle = styled.span`
  color: var(--color);
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
`;

const LiveDate = styled.span`
  color: var(--color);
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
`;

const LiveMembers = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
`;

const ProductContainer = styled.div`
  flex: 1 1 auto;
  display: grid;
  grid-template-columns: 243px 243px;
  gap: 16px 8px;
`;

export default ReportLivePage;
