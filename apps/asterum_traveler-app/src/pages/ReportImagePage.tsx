import styled from 'styled-components';
import MemberBox from '../components/report/MemberBox';
import ProductBox from '../components/report/ProductBox';

function ReportImagePage() {
  return (
    <Wrapper>
      <Thumbnail
        width="540"
        src="https://i.namu.wiki/i/4khghYBSI1St9br_7FyzrXmSZxmPmf8NHmkYDjWk6sXxy0KajSMaRgl430uM-vZw63XC5bv0Bw36vfplsx-s_jdcYJEQs_2xsmotQZKpv2kgeUmt_AawupMDBKKWNgEiYgSsECSekLWI3XZZuD6cQw.webp"
      ></Thumbnail>
      <InfoContainer>
        <MemberBox member="noah"></MemberBox>
        <UpdateInfo className="text-overflow-1">2023년 10월 15일 수요일 7시 음악방송</UpdateInfo>
        <TagBox>
          <Tag>#아메카지</Tag>
          <Tag>#아메카지</Tag>
          <Tag>#아메카지</Tag>
        </TagBox>
        <ProductContainer>
          <ProductBox />
          <ProductBox />
        </ProductContainer>
      </InfoContainer>
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
  overflow-x: hidden;
`;

const Thumbnail = styled.img`
  flex: 0 0 540px;
  width: 540px;
  object-fit: contain;
`;

const InfoContainer = styled.div`
  width: calc(100% - (540px + 64px));
`;

const UpdateInfo = styled.div`
  margin-top: 16px;
`;

const TagBox = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background-color: var(--report);
  border-radius: 999px;
  padding: 4px 12px;
  color: #000;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
`;

const ProductContainer = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 32px 8px;
`;

export default ReportImagePage;
