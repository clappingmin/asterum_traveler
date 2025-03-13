import styled from 'styled-components';
import MemberBox from '@/components/report/MemberBox';
import ProductBox from '@/components/report/ProductBox';
import { Report } from '@asterum/types';
import { ALL_MEMBERS } from '@/shared/constants';
import { useState } from 'react';
import FetchErrorBoundary from '@/components/global/error/FetchErrorBoundary';

interface ReportLivePageProps {
  reportData: Report;
}

function ReportLivePage({ reportData }: ReportLivePageProps) {
  const { reportThumbnail, liveTitle, reportDateDisplay, reportMembers, includedProducts } =
    reportData;
  const [refetchFn, setRefetchFn] = useState<(() => Promise<any>) | null>(null);

  return (
    <Wrapper>
      <LiveContainer>
        <LiveThumbnail src={reportThumbnail} width={960} height={540} alt="라이브 이미지" />
        <LiveTitle className="text-overflow-2">{liveTitle}</LiveTitle>
        <LiveDate>{reportDateDisplay}</LiveDate>
        <LiveMembers>
          {ALL_MEMBERS.map((member) => {
            return reportMembers.includes(member) && <MemberBox key={member} member={member} />;
          })}
        </LiveMembers>
      </LiveContainer>
      <FetchErrorBoundary onRetry={() => refetchFn && refetchFn()}>
        <ProductContainer>
          {includedProducts.map((product) => {
            return (
              <ProductBox
                key={product.productId}
                includedProduct={product}
                onRefetch={setRefetchFn}
              />
            );
          })}
        </ProductContainer>
      </FetchErrorBoundary>
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
  user-select: none;
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
