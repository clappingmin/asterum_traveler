import styled from 'styled-components';
import MemberBox from '@/components/report/MemberBox';
import ProductBox from '@/components/report/ProductBox';
import { Report } from '@asterum/types';
import { useState } from 'react';
import FetchErrorBoundary from '@/components/global/error/FetchErrorBoundary';
import { usePageContext } from '@/renderer/usePageContext';
import { goToNotFound, sortMembers } from '@/shared/utils';
import { useQuery } from '@tanstack/react-query';
import * as api from '@/shared/services/reportService';
import LoadingDim from '@/components/global/LoadingDim';
import { motion } from 'framer-motion';

function Page() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [refetchFn, setRefetchFn] = useState<(() => Promise<unknown>) | null>(null);
  const { urlPathname } = usePageContext();

  const segments = urlPathname.split('/');
  const pageId = segments.length >= 4 ? segments[3] : null;

  if (!pageId) goToNotFound();

  const { data, isLoading, error, isError } = useQuery<Report>({
    queryKey: ['report', pageId],
    queryFn: async () => {
      if (!pageId) {
        goToNotFound();
        return Promise.reject('pageId Error');
      }
      return await api.getReportById(pageId);
    },
    retry: false,
  });

  if (isError) throw error;

  if (!isLoading && !data) {
    goToNotFound();
    return;
  }

  return (
    <>
      {isLoading && <LoadingDim />}
      <Wrapper>
        <LiveContainer>
          <LiveThumbnail
            src={data?.reportThumbnail}
            width={960}
            height={540}
            alt="ASTERUM TRAVELER Report 페이지 라이브 타입 리포트 썸네일"
            onLoad={() => {
              setLoaded(true);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <LiveTitle className="text-overflow-2">{data?.liveTitle}</LiveTitle>
          <LiveDate>{data?.reportDateDisplay}</LiveDate>
          <LiveMembers>
            {data?.reportMembers &&
              sortMembers(data?.reportMembers).map((member) => (
                <MemberBox key={member} member={member} />
              ))}
          </LiveMembers>
        </LiveContainer>
        <FetchErrorBoundary onRetry={() => refetchFn?.()}>
          <ProductContainer>
            {data?.includedProducts.map((product) => {
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
    </>
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

const LiveThumbnail = styled(motion.img)`
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

export { Page };
