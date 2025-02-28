import styled from 'styled-components';
import MemberBox from '../../components/report/MemberBox';
import ProductBox from '../../components/report/ProductBox';
import { Report } from '@asterum/types';
import { ALL_MEMBERS } from '../../shared/constants';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ApiErrorBoundary from '../../components/global/error/ApiErrorBoundary';

interface ReportImagePageProps {
  reportData: Report;
}

function ReportImagePage({ reportData }: ReportImagePageProps) {
  const { reportThumbnail, reportMembers, reportDateDisplay, imageTags, includedProducts } =
    reportData;
  const [loaded, setLoaded] = useState<boolean>(false);
  const [refetchFn, setRefetchFn] = useState<(() => Promise<any>) | null>(null);

  return (
    <Wrapper>
      <Thumbnail
        width="540"
        src={reportThumbnail}
        alt="리포트 이미지"
        onLoad={() => {
          setLoaded(true);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <InfoContainer>
        <Members>
          {ALL_MEMBERS.map((member) => {
            return reportMembers.includes(member) && <MemberBox key={member} member={member} />;
          })}
        </Members>
        <UpdateInfo className="text-overflow-1">{reportDateDisplay}</UpdateInfo>
        <TagBox>
          {imageTags?.map((tag, index) => (
            <Tag key={`tag-${index}`}>#{tag}</Tag>
          ))}
        </TagBox>
        <ProductContainer>
          <ApiErrorBoundary onRetry={() => refetchFn && refetchFn()}>
            {includedProducts.map((product) => {
              return (
                <ProductBox
                  key={product.productId}
                  includedProduct={product}
                  onRefetch={setRefetchFn}
                />
              );
            })}
          </ApiErrorBoundary>
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
  user-select: none;
`;

const Thumbnail = styled(motion.img)`
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
  grid-template-columns: repeat(4, 1fr);
  gap: 32px 8px;
`;

export default ReportImagePage;
