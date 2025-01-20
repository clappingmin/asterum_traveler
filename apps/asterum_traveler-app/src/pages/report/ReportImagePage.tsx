import styled from 'styled-components';
import MemberBox from '../../components/report/MemberBox';
import ProductBox from '../../components/report/ProductBox';
import { Report } from '@asterum/types';
import { ALL_MEMBERS } from '../../shared/constants';

interface ReportImagePageProps {
  reportData: Report;
}

function ReportImagePage({ reportData }: ReportImagePageProps) {
  const { reportThumbnail, reportMembers, reportDate, imageTags, includedProducts } = reportData;
  return (
    <Wrapper>
      <Thumbnail width="540" src={reportThumbnail}></Thumbnail>
      <InfoContainer>
        <Members>
          {ALL_MEMBERS.map((member) => {
            return reportMembers.includes(member) && <MemberBox key={member} member={member} />;
          })}
        </Members>
        <UpdateInfo className="text-overflow-1">{reportDate.display}</UpdateInfo>
        <TagBox>
          {imageTags?.map((tag, index) => (
            <Tag key={`tag-${index}`}>#{tag}</Tag>
          ))}
        </TagBox>
        <ProductContainer>
          {includedProducts.map((product) => {
            return <ProductBox key={product.productId} includedProduct={product} />;
          })}
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

const Members = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
`;

const UpdateInfo = styled.div`
  color: var(--color);
  margin-top: 16px;
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
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
